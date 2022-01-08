
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { HomeAssistant, fireEvent, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers'
import { localize } from './localize/localize';

import { HumidifierCardConfig } from './types';
declare global {
  interface HTMLElementTagNameMap {
    'midea-humidifier-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

import { customElement, property, state } from 'lit/decorators';

const CARD_NAME = "midea-humidifier-card-editor"

const debug = input => JSON.stringify(input, null, 2)
@customElement("midea-humidifier-card-editor")
export class MideaHumidifierCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: HumidifierCardConfig;
  @state() private _helpers?: any;
  private _initialized = false;

  public setConfig(config: HumidifierCardConfig): void {
    console.warn(`[${CARD_NAME}::setConfig]: config : ${debug(config)}`)
    this._config = config;

    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _name(): string {
    return this._config?.name || '';
  }

  get _entity(): string {
    return this._config?.entity || '';
  }

  get _fan_entity(): string {
    return this._config?.fan_entity || '';
  }
  
  get _humidity_entity(): string {
    return this._config?.humidity_entity || '';
  }  
  
  get _temperature_entity(): string {
    return this._config?.temperature_entity || '';
  }    

  get _ion_entity(): string {
    return this._config?.ion_entity || '';
  }

  get _defrost_entity(): string {
    return this._config?.defrost_entity || '';
  }  

  get _filter_entity(): string {
    return this._config?.filter_entity || '';
  }  

  get _tank_entity(): string {
    return this._config?.tank_entity || '';
  }
    
  get _show_ion_toggle(): boolean {
    return this._config?.show_ion_toggle || false;
  }

  get _swap_target_and_current_humidity(): boolean {
    return this._config?.swap_target_and_current_humidity || false;
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    // The climate more-info has ha-switch and paper-dropdown-menu elements that are lazy loaded unless explicitly done here
    this._helpers.importMoreInfoControl('climate');

    // You can restrict on domain type
    const humidifierDomains = ["humidifier"];
    const sensorDomains = ["sensor"];
    const fanDomains = ["fan"];
    const binarySensorDomains = ["binary_sensor"];

    return html`
      <div class="card-config">
        <ha-entity-picker
            .label="${this.hass.localize(
              "ui.panel.lovelace.editor.card.generic.entity"
            )} (${this.hass.localize(
              "ui.panel.lovelace.editor.card.config.required"
            )}) - ${this.hass.localize(
              "ui.panel.lovelace.editor.card.humidifier.name"
            )}"
            .hass=${this.hass}
            .value=${this._entity}
            .configValue=${"entity"}
            .includeDomains=${humidifierDomains}
            @change=${this._valueChanged}
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            .label="${this.hass.localize(
              "ui.panel.lovelace.editor.card.generic.entity"
            )} (${this.hass.localize(
              "ui.panel.lovelace.editor.card.config.required"
            )}) - ${this.hass.localize(
              "state_attributes.climate.hvac_action.fan"
            )}"
            .hass=${this.hass}
            .value=${this._fan_entity}
            .configValue=${"fan_entity"}
            .includeDomains=${fanDomains}
            @change=${this._valueChanged}
            allow-custom-entity
          ></ha-entity-picker>          
          <ha-entity-picker
          .label="${this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.entity"
          )} (${this.hass.localize(
            "ui.panel.lovelace.editor.card.config.required"
          )}) - ${this.hass.localize(
            "ui.card.weather.attributes.humidity"
          )}"
          .hass=${this.hass}
          .value=${this._humidity_entity}
          .configValue=${"humidity_entity"}
          .includeDomains=${sensorDomains}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .label="${this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.entity"
          )} (${this.hass.localize(
            "ui.panel.lovelace.editor.card.config.required"
          )}) - ${this.hass.localize(
            "ui.card.weather.attributes.temperature"
          )}"
          .hass=${this.hass}
          .value=${this._temperature_entity}
          .configValue=${"temperature_entity"}
          .includeDomains=${sensorDomains}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .label="${this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.entity"
          )} - ${localize("common.tank")}"
          .hass=${this.hass}
          .value=${this._tank_entity}
          .configValue=${"tank_entity"}
          .includeDomains=${binarySensorDomains}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .label="${this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.entity"
          )} - ${localize("common.defrost")}"
          .hass=${this.hass}
          .value=${this._defrost_entity}
          .configValue=${"defrost_entity"}
          .includeDomains=${binarySensorDomains}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>  
        <ha-entity-picker
          .label="${this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.entity"
          )} - ${localize("common.filter")}"
          .hass=${this.hass}
          .value=${this._filter_entity}
          .configValue=${"filter_entity"}
          .includeDomains=${binarySensorDomains}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>                                           
        <ha-formfield .label=${`Toggle ion toggle icon ${this._show_ion_toggle ? 'off' : 'on'}`}>
          <ha-switch
            .checked=${this._show_ion_toggle !== false}
            .configValue=${'show_ion_toggle'}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield .label=${`Toggle swap current and target humidity display ${this._swap_target_and_current_humidity ? 'off' : 'on'}`}>
          <ha-switch
            .checked=${this._swap_target_and_current_humidity !== false}
            .configValue=${'swap_target_and_current_humidity'}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>                                
      </div>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }


  /* -- imported --
  private _valueChanged(ev: EntitiesEditorEvent): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target! as EditorTarget;

    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === "") {
        this._config = { ...this._config };
        delete this._config[target.configValue!];
      } else {
        this._config = { ...this._config, [target.configValue!]: target.value };
      }
    }
    fireEvent(this, "config-changed", { config: this._config });
  }  
  */
 
  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        const tmpConfig = { ...this._config };
        delete tmpConfig[target.configValue];
        this._config = tmpConfig;
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    console.log(`[${CARD_NAME}::this._valueChanged]: new config : ${debug(this._config)}`)
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles(): CSSResultGroup {
    return css`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
    `;
  }
}