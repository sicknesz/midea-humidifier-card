/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  mdiAirHumidifier,
  mdiAirHumidifierOff,
  mdiAirFilter,
  mdiDotsVertical,
  mdiCalendarSync,
  mdiTumbleDryer,
  mdiFanSpeed1,
  mdiFanSpeed2,
  mdiFanSpeed3,
  mdiAlertCircle,
  mdiPower,
  mdiPowerCycle
} from "@mdi/js";
// import "@thomasloven/round-slider";
import { HassEntity, STATE_NOT_RUNNING } from "home-assistant-js-websocket";
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

import { LovelaceRowConfig, HumidifierCardConfig } from "./types"

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
  continuous: mdiAirFilter,
  smart: mdiCalendarSync,
  dry: mdiTumbleDryer
};

const powerIcons: { [status in PowerStatus]: string } = {
  off: mdiPower,
  on:  mdiPowerCycle /* mdiPower*/, // colored version
};

const fanModeIcons: { [fanMode in HumidifierFanMode]: string } = {
  silent: mdiFanSpeed1,
  medium: mdiFanSpeed2,
  turbo: mdiFanSpeed3,
  tank: mdiAlertCircle
}

const CARD_NAME = "midea-humidifier-card"
const version = "1.0.1"

console.info(`%c${CARD_NAME}: ${version}`, 'font-weight: bold');
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'midea-humidifier-card',
  name: 'Midea Humidifier Card',
  description: 'Midea Humidifier Lan companion card',
});

@customElement(CARD_NAME)
export class MideaHumidifierCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import("./midea-humidifier-card-editor");
    return document.createElement(CARD_NAME+"-editor");    
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
    );

    
    return { 
      type: "humidifier", 
      entity: foundEntities[0] || "",
      fan_entity: "",
      tank_entity: "",
      humidity_entity: "",
      temperature_entity: ""
    };
  }
  @property({ attribute: false }) public hass?: HomeAssistant;

  @property() private _helpers?: any;

  @state() private _config?: HumidifierCardConfig;

  @state() private _setHum?: number;


  public getCardSize(): number {
    return 6;
  }

  public setConfig(config: HumidifierCardConfig): void {
    if (!config.entity || config.entity.split(".")[0] !== "humidifier") {
      throw new Error("Specify an entity from within the humidifier domain");
    }

    this._config = config;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }  

  private _lower(string: string) {
    return string?.toLowerCase()
  }

  private _renderPowerIcon(currentPowerStatus: string, currentStatus: string): TemplateResult {

    if (!powerIcons[this._lower(currentPowerStatus)]) {
      return html``;
    }

    const isSelected  = !!(currentPowerStatus === currentStatus)

    console.info(`[Humidifier-card]: fan icon : _renderPowerIcon : ${currentPowerStatus} current : ${currentStatus} isSelected: ${isSelected}`)
    
    return html`
      <ha-icon-button
        class=${classMap({ "selected-icon": isSelected })}
        .status=${currentPowerStatus}
        @click=${this._handlePowerAction}
        tabindex="0"
        .path=${powerIcons[this._lower(currentPowerStatus)]}
        .label=${this._lower(currentPowerStatus)}
      >
      </ha-icon-button>
    `;
  }


  private _renderFanIcon(fanMode: string, currentFanMode: string | undefined, poweredOff: boolean): TemplateResult {

    const isSelected = !!(currentFanMode === fanMode)
    console.info(`[Humidifier-card]: fan icon : render : ${fanMode} current : ${currentFanMode} poweredOff: ${poweredOff} isSelected: ${isSelected}`)

    if (!fanModeIcons[this._lower(fanMode)]) {
      console.info("[Humidifier-card]: no fan icon found, no html")
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
    console.info(`[Humidifier-card]: mode icon : render : ${mode} current : ${currentMode} poweredOff: ${poweredOff} isSelected: ${isSelected}`)
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

    console.info(`[Humidifier-card]: calling service humidifier.${callService} with value ${(e.currentTarget as any).status}`)
    this.hass!.callService("humidifier", callService, {
      entity_id: this._config!.entity
    });
  }

  private _handleFanAction(e: MouseEvent): void {
    console.info(`[Humidifier-card]: calling service fan.set_preset_mode with value ${(e.currentTarget as any).mode}`)
    this.hass!.callService("fan", "set_preset_mode", {
      entity_id: this._config!.fan_entity,
      preset_mode: (e.currentTarget as any).mode,
    });
  }

  private _handleAction(e: MouseEvent): void {
    console.info(`[Humidifier-card]: calling service humidifier.set_mode with value ${(e.currentTarget as any).mode}`)
    this.hass!.callService("humidifier", "set_mode", {
      entity_id: this._config!.entity,
      mode: (e.currentTarget as any).mode,
    });
  }

  private _getPrimaryText(hasProblems: boolean, name: string): string {
    return hasProblems ? /* this.hass!.localize("tank_is_full") */"Tank is full !" : name
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    // original entity
    const stateObj = this.hass.states[this._config.entity] as HumidifierEntity;

    // added entities
    const fanStateObj = this.hass.states[this._config!.fan_entity] as HumidifierFanEntity;
    const tankStateObj = this.hass.states[this._config!.tank_entity] as BinaryEntity;
    let currentMode = this._lower(stateObj!.attributes!.mode) in modeIcons ? stateObj!.attributes!.mode : "unknown-mode" as string;
    let currentFanMode = this._lower(fanStateObj!.attributes!.preset_mode) in fanModeIcons ? fanStateObj!.attributes!.preset_mode : "unknown-fan-mode" as string;

    const currentHumidityString = this.hass.states[this._config!.humidity_entity]!.state;
    const currentHumidity = parseFloat(currentHumidityString) as number;

    const currentPowerStatus = stateObj.state

    const isPoweredOff = !!(stateObj.state === "off")

    const currentTemperatureString = this.hass.states[this._config!.temperature_entity]?.state;
    const currentTemperature = parseFloat(currentTemperatureString) as number;

    if (!stateObj) {
      return html`
        <hui-warning>
          ${createEntityNotFoundWarning(this.hass, this._config.entity)}
        </hui-warning>
      `;
    }


    // eslint-disable-next-line no-console
    console.groupCollapsed("[Humidifier-dump]")
    // eslint-disable-next-line no-console
    console.log("[DEBUG]: stateObj : ", stateObj)
    // eslint-disable-next-line no-console
    console.log("[DEBUG]: fanStateObj : ", fanStateObj)
    // eslint-disable-next-line no-console
    console.log("[DEBUG]: tankStateObj : ", tankStateObj)
    // eslint-disable-next-line no-console
    console.log("[DEBUG]: hass : ", this.hass.states)
    // eslint-disable-next-line no-console
    console.log("[DEBUG]: this._config : ", this._config)
    // eslint-disable-next-line no-console
    console.log("[DEBUG]: isPoweredOff : ", isPoweredOff)    
    // eslint-disable-next-line no-console
    console.groupEnd()

    const name =
      this._config!.name ||
      computeStateName(this.hass!.states[this._config!.entity]);

    const targetHumidity =
      stateObj.attributes.humidity !== null &&
      Number.isFinite(Number(stateObj.attributes.humidity))
        ? stateObj.attributes.humidity
        : stateObj.attributes.min_humidity;

    const rtlDirection = computeRTLDirection(this.hass);

    const slider = (UNAVAILABLE_STATES.includes(stateObj.state) || isPoweredOff)
      ? html` <round-slider disabled="true"></round-slider> `
      : html`
          <round-slider
            .value=${targetHumidity}
            .min=${stateObj.attributes.min_humidity}
            .max=${stateObj.attributes.max_humidity}
            .rtl=${rtlDirection === "rtl"}
            step="1"
            @value-changing=${this._dragEvent}
            @value-changed=${this._setHumidity}
          ></round-slider>
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
          ${this._setHum && !isNaN(this._setHum) ?
            svg`${this._setHum.toFixed()}
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
            currentHumidity === undefined ||
            currentHumidity === null
              ? ""
              : svg`
                    ${currentHumidity}% - ${currentTemperature}°C
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


    // Fix this sh.t code ...    
    const hasProblems = tankStateObj.state === 'on'
    if (hasProblems) {
      const { attributes: { preset_modes: [one, two, three] } } = fanStateObj
      fanStateObj.attributes.preset_modes = [one, two, three, "tank"]
      currentFanMode = "tank"
      currentMode= "tank"
    } else {
      const { attributes: { preset_modes: [one, two, three] } } = fanStateObj
      fanStateObj.attributes.preset_modes = [one, two, three]
    }

    return html`
      <ha-card
        class=${classMap({
      [currentMode]: true,
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
            </div>
            <div id="modes">
              ${(fanStateObj.attributes.preset_modes || [])
                .concat()
                .sort(compareClimateFanHumidifierModes)
                .map((modeItem) => this._renderFanIcon(modeItem, currentFanMode, isPoweredOff))}
              ${this._renderPowerIcon(currentPowerStatus === 'off' ? "on" : "off", currentPowerStatus)}
            </div>
            ${this._getPrimaryText(hasProblems, name)}
          </div>
        </div>
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

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

    if (!oldHass || oldHass.states[this._config.entity] !== stateObj) {
      this._setHum = this._getSetHum(stateObj);
    }
  }

  private _rescale_svg() {
    // Set the viewbox of the SVG containing the set temperature to perfectly
    // fit the text
    // That way it will auto-scale correctly
    // This is not done to the SVG containing the current temperature, because
    // it should not be centered on the text, but only on the value
    if (this.shadowRoot && this.shadowRoot.querySelector("ha-card")) {
      (
        this.shadowRoot.querySelector("ha-card") as LitElement
      ).updateComplete.then(() => {
        const svgRoot = this.shadowRoot!.querySelector("#set-values")!;
        const box = svgRoot.querySelector("g")!.getBBox()!;
        svgRoot.setAttribute(
          "viewBox",
          `${box.x} ${box!.y} ${box.width} ${box.height}`
        );
        svgRoot.setAttribute("width", `${box.width}`);
        svgRoot.setAttribute("height", `${box.height}`);
      });
    }    

  }

  private _getSetHum(stateObj: HassEntity): undefined | number {
    if (UNAVAILABLE_STATES.includes(stateObj.state)) {
      return undefined;
    }

    return stateObj.attributes.humidity;
  }

  private _dragEvent(e): void {
    this._setHum = e.detail.value;
  }

  private _setHumidity(e): void {
    this.hass!.callService("humidifier", "set_humidity", {
      entity_id: this._config!.entity,
      humidity: e.detail.value,
    });
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
      .tank {
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

      text {
        fill: var(--primary-text-color);
      }
    `;
  }
}

// declare global {
//   interface HTMLElementTagNameMap {
//     [CARD_NAME]: MideaHumidifierCard;
//   }
// }


