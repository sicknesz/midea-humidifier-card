import{n as i,y as o,A as e,r as t,_ as n,e as a,t as s,a as c}from"./midea-humidifier-card-7dfbb60b.js";const d={required:{icon:"tune",name:"Required",secondary:"Required options for this card to function",show:!0},actions:{icon:"gesture-tap-hold",name:"Actions",secondary:"Perform actions based on tapping/clicking",show:!1,options:{tap:{icon:"gesture-tap",name:"Tap",secondary:"Set the action to perform on tap",show:!1},hold:{icon:"gesture-tap-hold",name:"Hold",secondary:"Set the action to perform on hold",show:!1},double_tap:{icon:"gesture-double-tap",name:"Double Tap",secondary:"Set the action to perform on double tap",show:!1}}},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the name, icon, etc",show:!1}};let r=class extends i{constructor(){super(...arguments),this._initialized=!1}setConfig(i){this._config=i,this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var i;return(null===(i=this._config)||void 0===i?void 0:i.name)||""}get _entity(){var i;return(null===(i=this._config)||void 0===i?void 0:i.entity)||""}get _show_warning(){var i;return(null===(i=this._config)||void 0===i?void 0:i.show_warning)||!1}get _show_error(){var i;return(null===(i=this._config)||void 0===i?void 0:i.show_error)||!1}get _tap_action(){var i;return(null===(i=this._config)||void 0===i?void 0:i.tap_action)||{action:"more-info"}}get _hold_action(){var i;return(null===(i=this._config)||void 0===i?void 0:i.hold_action)||{action:"none"}}get _double_tap_action(){var i;return(null===(i=this._config)||void 0===i?void 0:i.double_tap_action)||{action:"none"}}render(){if(!this.hass||!this._helpers)return o``;this._helpers.importMoreInfoControl("climate");const i=Object.keys(this.hass.states).filter((i=>"sun"===i.substr(0,i.indexOf("."))));return o`
      <div class="card-config">
        <div class="option" @click=${this._toggleOption} .option=${"required"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${d.required.icon}`}></ha-icon>
            <div class="title">${d.required.name}</div>
          </div>
          <div class="secondary">${d.required.secondary}</div>
        </div>
        ${d.required.show?o`
              <div class="values">
                <paper-dropdown-menu
                  label="Entity (Required)"
                  @value-changed=${this._valueChanged}
                  .configValue=${"entity"}
                >
                  <paper-listbox slot="dropdown-content" .selected=${i.indexOf(this._entity)}>
                    ${i.map((i=>o`
                        <paper-item>${i}</paper-item>
                      `))}
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"actions"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${d.actions.icon}`}></ha-icon>
            <div class="title">${d.actions.name}</div>
          </div>
          <div class="secondary">${d.actions.secondary}</div>
        </div>
        ${d.actions.show?o`
              <div class="values">
                <div class="option" @click=${this._toggleAction} .option=${"tap"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${d.actions.options.tap.icon}`}></ha-icon>
                    <div class="title">${d.actions.options.tap.name}</div>
                  </div>
                  <div class="secondary">${d.actions.options.tap.secondary}</div>
                </div>
                ${d.actions.options.tap.show?o`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"hold"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${d.actions.options.hold.icon}`}></ha-icon>
                    <div class="title">${d.actions.options.hold.name}</div>
                  </div>
                  <div class="secondary">${d.actions.options.hold.secondary}</div>
                </div>
                ${d.actions.options.hold.show?o`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"double_tap"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${d.actions.options.double_tap.icon}`}></ha-icon>
                    <div class="title">${d.actions.options.double_tap.name}</div>
                  </div>
                  <div class="secondary">${d.actions.options.double_tap.secondary}</div>
                </div>
                ${d.actions.options.double_tap.show?o`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"appearance"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${d.appearance.icon}`}></ha-icon>
            <div class="title">${d.appearance.name}</div>
          </div>
          <div class="secondary">${d.appearance.secondary}</div>
        </div>
        ${d.appearance.show?o`
              <div class="values">
                <paper-input
                  label="Name (Optional)"
                  .value=${this._name}
                  .configValue=${"name"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <br />
                <ha-formfield .label=${"Toggle warning "+(this._show_warning?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._show_warning}
                    .configValue=${"show_warning"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${"Toggle error "+(this._show_error?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._show_error}
                    .configValue=${"show_error"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            `:""}
      </div>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleAction(i){this._toggleThing(i,d.actions.options)}_toggleOption(i){this._toggleThing(i,d)}_toggleThing(i,o){const e=!o[i.target.option].show;for(const[i]of Object.entries(o))o[i].show=!1;o[i.target.option].show=e,this._toggle=!this._toggle}_valueChanged(i){if(!this._config||!this.hass)return;const o=i.target;if(this[`_${o.configValue}`]!==o.value){if(o.configValue)if(""===o.value){const i=Object.assign({},this._config);delete i[o.configValue],this._config=i}else this._config=Object.assign(Object.assign({},this._config),{[o.configValue]:void 0!==o.checked?o.checked:o.value});e(this,"config-changed",{config:this._config})}}static get styles(){return t`
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
    `}};n([a({attribute:!1})],r.prototype,"hass",void 0),n([s()],r.prototype,"_config",void 0),n([s()],r.prototype,"_toggle",void 0),n([s()],r.prototype,"_helpers",void 0),r=n([c("midea-humidifier-card-editor")],r);export{r as MideaHumidifierCardEditor};
