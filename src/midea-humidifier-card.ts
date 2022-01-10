/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {  
  mdiAutorenew,
  mdiAirHumidifier,
  mdiAirHumidifierOff,
  mdiAirPurifier,
  mdiHeadLightbulbOutline,
  mdiTshirtCrew,
  mdiDotsVertical,
  mdiFanSpeed1,
  mdiFanSpeed2,
  mdiFanSpeed3,
  mdiPower,
  mdiPowerCycle,
  mdiSnowflakeMelt
} from "@mdi/js";
// import "@thomasloven/round-slider";
import { HassEntity, STATE_NOT_RUNNING } from "home-assistant-js-websocket";
import { localize } from "./localize/localize";
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  PropertyValues,
  svg,
  TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators";
import { classMap } from "lit/directives/class-map";
import { 
  HomeAssistant, 
  LovelaceCard, 
  // LovelaceCardEditor,
  applyThemesOnElement,
  fireEvent, 
  EntityConfig, 
  computeRTLDirection, 
  computeDomain,  
} from 'custom-card-helpers';

import {
  HumidifierEntity,
  HumidifierFanEntity,
  BinaryEntity,
  compareClimateHumidifierModes,
  compareClimateFanHumidifierModes,
  HumidifierMode,
  HumidifierFanMode,
  PowerStatus
} from "./humidifier";

import { LovelaceRowConfig, HumidifierCardConfig, ProblemConfig } from "./types"

// Re-imported stuff from original humidifier card into custom card
const arrayFilter = (
  array: any[],
  conditions: Array<(value: any) => boolean>,
  maxSize: number
) => {
  if (!maxSize || maxSize > array.length) {
    maxSize = array.length;
  }

  const filteredArray: any[] = [];

  for (let i = 0; i < array.length && filteredArray.length < maxSize; i++) {
    let meetsConditions = true;

    for (const condition of conditions) {
      if (!condition(array[i])) {
        meetsConditions = false;
        break;
      }
    }

    if (meetsConditions) {
      filteredArray.push(array[i]);
    }
  }

  return filteredArray;
};

export const findEntities = (
  hass: HomeAssistant,
  maxEntities: number,
  entities: string[],
  entitiesFallback: string[],
  includeDomains?: string[],
  entityFilter?: (stateObj: HassEntity) => boolean
) => {
  const conditions: Array<(value: string) => boolean> = [];

  if (includeDomains?.length) {
    conditions.push((eid) => includeDomains!.includes(computeDomain(eid)));
  }

  if (entityFilter) {
    conditions.push(
      (eid) => hass.states[eid] && entityFilter(hass.states[eid])
    );
  }

  const entityIds = arrayFilter(entities, conditions, maxEntities);

  if (entityIds.length < maxEntities && entitiesFallback.length) {
    const fallbackEntityIds = findEntities(
      hass,
      maxEntities - entityIds.length,
      entitiesFallback,
      [],
      includeDomains,
      entityFilter
    );

    entityIds.push(...fallbackEntityIds);
  }

  return entityIds;
};


export const computeStateName = (stateObj: HassEntity): string =>
  stateObj.attributes.friendly_name === undefined
    ? computeObjectId(stateObj.entity_id).replace(/_/g, " ")
    : stateObj.attributes.friendly_name || "";

/** Compute the object ID of a state. */
export const computeObjectId = (entityId: string): string => entityId.substr(entityId.indexOf(".") + 1);

const validEntityId = /^(\w+)\.(\w+)$/;

export const isValidEntityId = (entityId: string) => validEntityId.test(entityId);
  

export const processConfigEntities = <
  T extends EntityConfig | LovelaceRowConfig
>(
  entities: Array<T | string>,
  checkEntityId = true
): T[] => {
  if (!entities || !Array.isArray(entities)) {
    throw new Error("Entities need to be an array");
  }

  return entities.map((entityConf, index): T => {
    if (
      typeof entityConf === "object" &&
      !Array.isArray(entityConf) &&
      entityConf.type
    ) {
      return entityConf;
    }

    let config: T;

    if (typeof entityConf === "string") {
      config = { entity: entityConf } as T;
    } else if (typeof entityConf === "object" && !Array.isArray(entityConf)) {
      if (!("entity" in entityConf)) {
        throw new Error(
          `Entity object at position ${index} is missing entity field.`
        );
      }
      config = entityConf as T;
    } else {
      throw new Error(`Invalid entity specified at position ${index}.`);
    }

    if (checkEntityId && !isValidEntityId((config as EntityConfig).entity!)) {
      throw new Error(
        `Invalid entity ID at position ${index}: ${
          (config as EntityConfig).entity
        }`
      );
    }

    return config;
  });
};


function hasConfigChanged(element: any, changedProps: PropertyValues): boolean {
  if (changedProps.has("_config")) {
    return true;
  }

  const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
  if (!oldHass) {
    return true;
  }

  if (
    oldHass.connected !== element.hass!.connected ||
    oldHass.themes !== element.hass!.themes ||
    oldHass.locale !== element.hass!.locale ||
    oldHass.localize !== element.hass.localize ||
    oldHass.config.state !== element.hass.config.state
  ) {
    return true;
  }
  return false;
}

function hasConfigOrEntitiesChanged(
  element: any,
  changedProps: PropertyValues
): boolean {
  if (hasConfigChanged(element, changedProps)) {
    return true;
  }

  const oldHass = changedProps.get("hass") as HomeAssistant;

  const entities = processConfigEntities(element._config!.entities, false);

  return entities.some(
    (entity) =>
      "entity" in entity &&
      oldHass.states[entity.entity] !== element.hass!.states[entity.entity]
  );
}

const createEntityNotFoundWarning = (
  hass: HomeAssistant,
  entityId: string
) =>
  hass.config.state !== STATE_NOT_RUNNING
    ? hass.localize(
        "ui.panel.lovelace.warning.entity_not_found",
        "entity",
        entityId || "[empty]"
      )
    : hass.localize("ui.panel.lovelace.warning.starting");

const UNAVAILABLE = "unavailable";
const UNKNOWN = "unknown";
const UNAVAILABLE_STATES = [UNAVAILABLE, UNKNOWN];

const modeIcons: { [mode in HumidifierMode]: string } = {
  off: mdiAirHumidifierOff,
  set: mdiAirHumidifier,
  continuous: mdiAutorenew,
  smart: mdiHeadLightbulbOutline,
  dry: mdiTshirtCrew
};

const powerIcons: { [status in PowerStatus]: string } = {
  off: mdiPower,
  on:  mdiPowerCycle /* mdiPower*/, // colored version
};

const fanModeIcons: { [fanMode in HumidifierFanMode]: string } = {
  silent: mdiFanSpeed1,
  medium: mdiFanSpeed2,
  turbo: mdiFanSpeed3
}

const CARD_NAME = "midea-humidifier-card";
const version  = "1.0.2";

console.info(
  `%c ${CARD_NAME} %c ${version}`,
  'color: cyan; background: black; font-weight: bold;',
  'color: darkblue; background: white; font-weight: bold;',
);
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_NAME,
  name: 'Midea Humidifier Card',
  description: 'Midea/Inventor Humidifier lovelace UI card',
});



const debug = (input: any) => JSON.stringify(input, null ,2)

@customElement(CARD_NAME)
export class MideaHumidifierCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<HTMLElement> {
    //await import(`./midea-humidifier-card-editor`);
    return document.createElement(`midea-humidifier-card-editor`);    
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): HumidifierCardConfig {
    const includeDomains = ["humidifier"];
    const maxEntities = 1;
    const foundEntities = findEntities(
      hass,
      maxEntities,
      entities,
      entitiesFallback,
      includeDomains
    ) || [];

    
    if(!foundEntities || !foundEntities[0].includes(".")) {
      return {
        type: "'custom:midea-humidifier-card'",
        entity: "",
        fan_entity: ``,
        tank_entity: ``,
        defrost_entity: ``,
        filter_entity: ``,
        humidity_entity: ``,
        temperature_entity: ``,
        ion_entity: ``,
        swap_target_and_current_humidity: true,
        show_ion_toggle: true
      }
    }
    
    const humidifierEntity = foundEntities[0].split(".")[1]
    // console.info(`[${CARD_NAME}::getStubConfig]: trying to prefill config automatically, found entity: ${humidifierEntity}`)
      
    // zeroconf editor entities autofill
    return { 
      type: "custom:midea-humidifier-card",
      entity: `humidifier.${humidifierEntity}` || "",
      fan_entity: `fan.${humidifierEntity}_fan`,
      tank_entity: `binary_sensor.${humidifierEntity}_tank_full`,
      defrost_entity: `binary_sensor.${humidifierEntity}_defrosting`,
      filter_entity: `binary_sensor.${humidifierEntity}_replace_filter`,
      humidity_entity: `sensor.${humidifierEntity}_humidity`,
      temperature_entity: `sensor.${humidifierEntity}_temperature`,
      ion_entity: `switch.${humidifierEntity}_ion_mode`,
      swap_target_and_current_humidity: true,
      show_ion_toggle: true
    };
  }
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HumidifierCardConfig;

  @state() private _targetHumidity?: number;

  @state() private _currentHumidity?: number;

  public getCardSize(): number {
    return 6;
  }

  public setConfig(config: HumidifierCardConfig): void {
    if (!config.entity || config.entity.split(".")[0] !== "humidifier") {
      throw new Error("Specify an entity from within the humidifier domain");
    }
    if (!config.fan_entity || config.fan_entity.split(".")[0] !== "fan") {
      throw new Error("Specify a fan_entity from within the fan domain");
    }
    if (!config.humidity_entity || !config.temperature_entity) {
      throw new Error("Humidity and temperature sensors entity are required for this card to function properly");
    }     
    console.info(`[${CARD_NAME}::setConfig]: Got new config : ${debug(config)}`)
    this._config = this.autoWatchEntities(config);
  }


  private autoWatchEntities(config: HumidifierCardConfig) : HumidifierCardConfig {
    console.info(`[${CARD_NAME}::autoWatchEntities]: dumping original config ${debug(config)}`)
    const { entities = [] } = config
    Object.keys(config).map(key => {
      if(key.includes("entity")) {
        console.info(`[${CARD_NAME}::autoWatchEntities]: found entity to add to entities[] ${config[key]}`)
        if(!entities.includes(config[key])) {
          entities.push(config[key])
        }        
      }
    })
    const newConfig = {
      ...config,
      entities
    }    
    console.info(`[${CARD_NAME}::autoWatchEntities]: dumping modified newConfig ${debug(newConfig)}`)
    return newConfig
  }

  private _lower(string: string) {
    return string?.toLowerCase()
  }

  private _renderPowerIcon(currentPowerStatus: string, currentStatus: string): TemplateResult {

    if (!powerIcons[this._lower(currentPowerStatus)]) {
      return html``;
    }

    const isSelected  = !!(currentPowerStatus === currentStatus)

    // //// console.info(`[Humidifier-card]: fan icon : _renderPowerIcon : ${currentPowerStatus} current : ${currentStatus} isSelected: ${isSelected}`)
    
    return html`
      <ha-icon-button
        class=${classMap({ "selected-icon": isSelected })}
        .status=${currentPowerStatus}
        @click=${this._handlePowerAction}
        tabindex="0"
        .path=${powerIcons[this._lower(currentPowerStatus)]}
        .label=${this._lower(currentPowerStatus)}
      >
      <ha-text>${currentPowerStatus}</ha-text>
      </ha-icon-button>
    `;
  }


  private _renderFanIcon(fanMode: string, currentFanMode: string | undefined, poweredOff: boolean): TemplateResult {

    const isSelected = !!(currentFanMode === fanMode)
    // //// console.info(`[Humidifier-card]: fan icon : render : ${fanMode} current : ${currentFanMode} poweredOff: ${poweredOff} isSelected: ${isSelected}`)

    if (!fanModeIcons[this._lower(fanMode)]) {
      return html``;
    }
    return html`
      <ha-icon-button
        class=${classMap({ "selected-icon": (isSelected && !poweredOff) })}
        .mode=${fanMode}
        @click=${this._handleFanAction}
        tabindex="0"
        .path=${fanModeIcons[this._lower(fanMode)]}
        .label=${this._lower(fanMode)}
      >
      </ha-icon-button>
    `;
  }  

  private _renderIcon(mode: string, currentMode: string, poweredOff: boolean): TemplateResult {

    const isSelected = !!(this._lower(currentMode) === this._lower(mode))

    if (!modeIcons[this._lower(mode)]) {
      return html``;
    }
    // //// console.info(`[Humidifier-card]: mode icon : render : ${mode} current : ${currentMode} poweredOff: ${poweredOff} isSelected: ${isSelected}`)
    return html`
      <ha-icon-button
        class=${classMap({ "selected-icon": (isSelected && !poweredOff) })}
        .mode=${mode}
        @click=${this._handleAction}
        tabindex="0"
        .path=${modeIcons[this._lower(mode)]}
        .label=${this._lower(mode)}
      >
      </ha-icon-button>
    `;
  }

  private _handlePowerAction(e: MouseEvent): void {
    const callService = ((e.currentTarget as any).status === "on") ? "turn_on" : "turn_off"
    //// console.info(`[Humidifier-card]: calling service humidifier.${callService} with value ${(e.currentTarget as any).status}`)
    this.hass!.callService("humidifier", callService, {
      entity_id: this._config!.entity
    });
  }

  private _handleFanAction(e: MouseEvent): void {
    //// console.info(`[Humidifier-card]: calling service fan.set_preset_mode with value ${(e.currentTarget as any).mode}`)
    this.hass!.callService("fan", "set_preset_mode", {
      entity_id: this._config!.fan_entity,
      preset_mode: (e.currentTarget as any).mode,
    });
  }

  private _handleToggleIonModeAction(): void {
    //// console.info(`[Humidifier-card]: calling service switch.toggle with value ${(e.currentTarget as any).status}`)
    this.hass!.callService("switch", "toggle", {
      entity_id: this._config!.ion_entity
    });
  }  

  private _handleAction(e: MouseEvent): void {
    //// console.info(`[Humidifier-card]: calling service humidifier.set_mode with value ${(e.currentTarget as any).mode}`)
    this.hass!.callService("humidifier", "set_mode", {
      entity_id: this._config!.entity,
      mode: (e.currentTarget as any).mode,
    });
  }


  private _getWarningText(problems: ProblemConfig): TemplateResult {    
    return html`<div>
      ${problems.tank ? html`<hui-warning>${localize("common.tank_is_full")}</hui-warning>` : html``}
      ${problems.defrost ? html`<hui-warning>${localize("common.defrosting")}</hui-warning>` : html``}
      ${problems.filter ? html`<hui-warning>${localize("common.change_airfilter")}</hui-warning>` : html``}
    </div>`    
  }


  private _get(nestedObj, pathArr) {
    return pathArr.reduce((obj, key) => ((obj && obj[key] !== 'undefined')
      ? obj[key]
      : undefined
    ), nestedObj)
  }

  private _readHassState(configEntry: string) : HassEntity | undefined {
    const stateEntry : boolean | undefined = this._get(this,["_config", configEntry])
    // console.log(`[${CARD_NAME}::this._readHassState]: canRead : ${stateEntry} - configEntry: ${configEntry}`, this.hass)
    if(stateEntry) {
      const value = this._get(this, ["hass","states",stateEntry])
      // console.log(`[${CARD_NAME}::this._readHassState]: read value : ${debug(value)}`, this.hass)
      return value
    }
    return undefined
  }   

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    // reading the global hass states 
    const stateObj = this._readHassState("entity") as HumidifierEntity
    const fanStateObj = this._readHassState("fan_entity") as HumidifierFanEntity;
    const tankStateObj = this._readHassState("tank_entity") as BinaryEntity;
    const filterStateObj = this._readHassState("filter_entity") as BinaryEntity;
    const defrostStateObj = this._readHassState("defrost_entity") as BinaryEntity;
    const ionStateObj = this._readHassState("ion_entity") as BinaryEntity;
    const currentMode = this._lower(stateObj?.attributes?.mode) in modeIcons ? stateObj?.attributes?.mode : "unknown-mode" as string;
    const currentFanMode = this._lower(fanStateObj?.attributes?.preset_mode) in fanModeIcons ? fanStateObj?.attributes?.preset_mode : "unknown-fan-mode" as string;
    const currentHumidityString = this.hass.states[this._config.humidity_entity].state;
    const currentPowerStatus = stateObj.state
    const isPoweredOff  = !!(currentPowerStatus === "off")
    const currentTemperatureString = this.hass.states[this._config.temperature_entity].state;
    const currentTemperature = parseFloat(currentTemperatureString) as number;

    if (!stateObj) {
      return html`
        <hui-warning>
          ${createEntityNotFoundWarning(this.hass, this._config.entity)}
        </hui-warning>
      `;
    }


    const swapTargetAndCurrent = (this._config.swap_target_and_current_humidity === true)

    const name =
      this._config!.name ||
      computeStateName(this.hass!.states[this._config!.entity]);

    const targetHumidity =
      stateObj.attributes.humidity !== null &&
      Number.isFinite(Number(stateObj.attributes.humidity))
        ? stateObj.attributes.humidity
        : stateObj.attributes.min_humidity;

    const rtlDirection = computeRTLDirection(this.hass);
    const sliderDisabled = (UNAVAILABLE_STATES.includes(stateObj.state) || isPoweredOff)

    const slider = sliderDisabled
      ? html` 
          <round-slider 
            .min=${stateObj!.attributes.min_humidity || 0} 
            .max=${stateObj!.attributes.max_humidity || 100} 
            .value=${targetHumidity} 
            disabled="true">
          </round-slider>`
      : html`
          <round-slider
            .value=${targetHumidity}
            .min=${stateObj.attributes.min_humidity || 0}
            .max=${stateObj.attributes.max_humidity || 100}           
            .rtl=${rtlDirection === "rtl"}
            step="5"
            @value-changing=${this._dragEvent}
            @value-changed=${this._setTargetHumidity}>
          </round-slider>
        `;   

    const targetHumiditySvg = svg`
      <svg viewBox="0 0 40 20">
        <text
          x="50%"
          dx="1"
          y="60%"
          text-anchor="middle"
          style="font-size: 13px;"
        >
          ${this._targetHumidity && !isNaN(this._targetHumidity) ?
            svg`${swapTargetAndCurrent ? html`${this._currentHumidity?.toFixed()}` : html`${this._targetHumidity.toFixed()}`}
              <tspan dx="-3" dy="-6.5" style="font-size: 4px;">
                %
              </tspan>
              `
            :
            ""
          }
        </text>
      </svg>
    `;
    

  const setValues = svg`
    <svg id="set-values">
      <g>
        <text text-anchor="middle" class="set-value">
        ${
            UNAVAILABLE_STATES.includes(currentHumidityString) ||
            this._currentHumidity === undefined ||
            this._currentHumidity === null
              ? ""
              : svg`
                    ${swapTargetAndCurrent ? this._targetHumidity?.toFixed() : this._currentHumidity.toFixed()}% - ${currentTemperatureString ? currentTemperature : ""}°C
                    `
          }
        </text>
        <text
            dy="22"
            text-anchor="middle"
            id="set-mode"
          >
            ${this.hass!.localize(`state.default.${stateObj.state}`)}
            ${
              stateObj.attributes.mode &&
              !UNAVAILABLE_STATES.includes(stateObj.state)
                ? html`
                    -
                    ${this.hass!.localize(
                      `state_attributes.humidifier.mode.${stateObj.attributes.mode}`
                    ) || stateObj.attributes.mode}
                  `
                : ""
            }
          </text>
      </g>
    </svg>
    `;

  const problems = {
    tank: (tankStateObj?.state === 'on'),
    defrost: (defrostStateObj?.state === 'on'), // not sure how to report this
    filter: (filterStateObj?.state === 'on')
  }

  const hasIssues : boolean = ((tankStateObj?.state === 'on')||(defrostStateObj?.state === 'on')||(filterStateObj?.state === 'on')) || false
  
    return html`
      <ha-card
        class=${classMap({
      [hasIssues ? 'error' : currentMode]: true,
    })}
      >
        <ha-icon-button
          class="more-info"
          .label=${this.hass!.localize("ui.panel.lovelace.cards.show_more_info")}
          .path=${mdiDotsVertical}
          @click=${this._handleMoreInfo}
          tabindex="0"
        ></ha-icon-button>
        <div class="content">
          <div id="controls">
            <div id="slider">
              ${slider}
              <div id="slider-center">
                <div id="humidity">${targetHumiditySvg} ${setValues}</div>
              </div>
            </div>
          </div>
          <div id="info" .title=${name}>
            <div id="modes">
              ${(stateObj.attributes.available_modes || [])
                .concat()
                .sort(compareClimateHumidifierModes)
                .map((modeItem) => this._renderIcon(modeItem, currentMode, isPoweredOff))}
              ${problems?.defrost 
                ? html`<ha-icon-button
                  class=${classMap({ "defrost-icon": problems!.defrost })}
                  tabindex="0"                  
                  .path=${mdiSnowflakeMelt}
                  .label=${"Defrost"}                
                  ></ha-icon-button>` : html``} 
            </div>
            <div id="modes">
              ${(this._config?.show_ion_toggle === true)
                ? html`<ha-icon-button
                  class=${classMap({ "ion-icon": (ionStateObj!.state === 'on') })}
                  tabindex="0"  
                  @click=${this._handleToggleIonModeAction}                
                  .path=${mdiAirPurifier}
                  .label=${"Ion"}                
                  ></ha-icon-button>` : html``}                
              ${(fanStateObj?.attributes?.preset_modes || [])
                .concat()
                .sort(compareClimateFanHumidifierModes)
                .map((modeItem) => this._renderFanIcon(modeItem, currentFanMode, isPoweredOff))}
              ${this._renderPowerIcon(currentPowerStatus === 'off' ? "on" : "off", currentPowerStatus)}             
            </div>          
            ${name}
          </div>
        </div>
        ${hasIssues ? this._getWarningText(problems) : html``}
      </ha-card>
    `;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntitiesChanged(this, changedProps);
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    

    if (
      !this._config ||
      !this.hass ||
      (!changedProps.has("hass") && !changedProps.has("_config"))
    ) {
      return;
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as
      | HumidifierCardConfig
      | undefined;


    if (
      !oldHass ||
      !oldConfig ||
      oldHass.themes !== this.hass.themes ||
      oldConfig.theme !== this._config.theme
    ) {
      applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
    

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return;
    }

    const fanStateObj = this.hass.states[this._config.fan_entity];
    if (!fanStateObj) {
      return;
    }

    if (!oldHass || oldHass.states[this._config.entity] !== stateObj || oldHass.states[this._config.fan_entity] !== fanStateObj) {
      this._rescale_svg();
    }
  }

  public willUpdate(changedProps: PropertyValues) {
    if (!this.hass || !this._config || !changedProps.has("hass")) {
      return;
    }

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return;
    }

    const humidityStateObj = this.hass.states[this._config.humidity_entity];
    if (!humidityStateObj) {
      return;
    }    

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

    if (!oldHass || oldHass.states[this._config.entity] !== stateObj) {
      this._targetHumidity = this._getTargetHumidity(stateObj);
    }

    if (!oldHass || oldHass.states[this._config.humidity_entity] !== stateObj) {
      this._currentHumidity = this._getCurrentHumidity(humidityStateObj);
    }    
  }



  // }
  private _rescale_svg() {
    // Set the viewbox of the SVG containing the set humidity to perfectly
    // fit the text
    // That way it will auto-scale correctly
    // This is not done to the SVG containing the current humidity, because
    // it should not be centered on the text, but only on the value
    if (this.shadowRoot && this.shadowRoot.querySelector("ha-card")) {
      (
        this.shadowRoot.querySelector("ha-card") as LitElement
      ).updateComplete.then(() => {
        const svgRoot = this.shadowRoot!.querySelector("#set-values");
        const box = svgRoot!.querySelector("g")!.getBBox();
        //// console.warn(`[${CARD_NAME}::_rescale_svg]: box ${debug(box)}`)
        svgRoot!.setAttribute(
          "viewBox",
          `${box!.x} ${box!.y} ${box!.width} ${box!.height}`
        );
        svgRoot!.setAttribute("width", `${box!.width}`);
        svgRoot!.setAttribute("height", `${box!.height}`);
      });
    }
  }  

  private _getTargetHumidity(stateObj: HassEntity): undefined | number {
    
    if (UNAVAILABLE_STATES.includes(stateObj.state)) {
      //// console.warn(`[${CARD_NAME}::_getTargetHumidity]: returning undefined ${stateObj.state}`)
      return undefined;
    }
    //// console.warn(`[${CARD_NAME}::_getTargetHumidity]: returning ${stateObj.attributes.humidity}`)
    return stateObj.attributes.humidity;
  }

  private _dragEvent(e): void {    
    this._targetHumidity = e.detail.value;
    //// console.warn(`[${CARD_NAME}::_dragEvent]: returning ${this._targetHumidity}`)
  }

  private _setTargetHumidity(e): void {
    //// console.warn(`[${CARD_NAME}::_targetHumidityidity]: setting ${e.detail.value} - this._targetHumidity: ${this._targetHumidity}`)
    this.hass!.callService("humidifier", "set_humidity", {
      entity_id: this._config!.entity,
      humidity: e.detail.value,
    });
  }

  private _getCurrentHumidity(stateObj: HassEntity): undefined | number {
    if (UNAVAILABLE_STATES.includes(stateObj.state) || isNaN(parseFloat(stateObj.state))) {
      //// console.warn(`[${CARD_NAME}::_getTargetHumidity]: returning undefined ${stateObj.state}`)
      return undefined;
    }
    return parseFloat(stateObj.state);
  }


  private _handleMoreInfo() {
    fireEvent(this, "hass-more-info", {
      entityId: this._config!.entity,
    });
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      ha-card {
        height: 100%;
        position: relative;
        overflow: hidden;
        --name-font-size: 1.2rem;
        --brightness-font-size: 1.2rem;
        --rail-border-color: transparent;
      }     
      .Off {
        --mode-color: var(--state-climate-idle-color);
      }
      .Dry {
        --mode-color: var(--state-climate-heat-color);
      }
      .Smart {
        --mode-color: var(--state-climate-cool-color);
      }
      .Continuous {
        --mode-color: var(--state-climate-eco-color);
      }
      .Set {
        --mode-color: var(--state-climate-manual-color);
      }
      .unknown-mode {
        --mode-color: var(--state-unknown-color);
      }
      .error {
        --mode-color: var(--error-color);
      }

      .more-info {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
        border-radius: 100%;
        color: var(--secondary-text-color);
        z-index: 1;
      }

      .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      #controls {
        display: flex;
        justify-content: center;
        padding: 16px;
        position: relative;
      }

      #slider {
        height: 100%;
        width: 100%;
        position: relative;
        max-width: 250px;
        min-width: 100px;
      }

      round-slider {
        --round-slider-path-color: var(--slider-track-color);
        --round-slider-bar-color: var(--mode-color);
        padding-bottom: 10%;
      }

      #slider-center {
        position: absolute;
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        box-sizing: border-box;
        border-radius: 100%;
        left: 20px;
        top: 20px;
        text-align: center;
        overflow-wrap: break-word;
        pointer-events: none;
      }

      #humidity {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 50%;
        top: 45%;
        left: 50%;
      }

      #set-values {
        max-width: 80%;
        transform: translate(0, -50%);
        font-size: 20px;
      }

      #set-mode {
        fill: var(--secondary-text-color);
        font-size: 16px;
      }

      #info {
        display: flex-vertical;
        justify-content: center;
        text-align: center;
        padding: 16px;
        margin-top: -60px;
        font-size: var(--name-font-size);
      }

      #modes > * {
        color: var(--disabled-text-color);
        cursor: pointer;
        display: inline-block;
      }

      #modes .selected-icon {
        color: var(--mode-color);
      }

      #modes .defrost-icon {
        color: var(--state-climate-cool-color);
      }      

      #modes .ion-icon {
        color: var(--secondary-text-color);
      }        

      text {
        fill: var(--primary-text-color);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_NAME]: MideaHumidifierCard;
  }
}


