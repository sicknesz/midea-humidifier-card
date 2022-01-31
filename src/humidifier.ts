import {
  HassEntityAttributeBase,
  HassEntityBase,
} from "home-assistant-js-websocket";

export type PowerStatus =
  | 'on'
  | 'off'

export type HumidifierMode =
  | "off"
  | "set"
  | "smart"
  | "continuous"
  | "dry";

export type HumidifierFanMode =
  | "low"
  | "silent"
  | "medium"
  | "turbo"
  | "high"

export type HumidifierProblems =
  | "TankIsFull"
  | "ReplaceAirFilter"
  | "Defrosting"


export type BinaryEntity = HassEntityBase& {
  attributes: HassEntityAttributeBase & {
    friendly_name?: string;
  };
};

export type HumidifierEntity = HassEntityBase & {
  attributes: HassEntityAttributeBase & {
    current_humidity?: number;
    humidity?: number;
    min_humidity?: number;
    max_humidity?: number;
    mode: HumidifierMode;
    available_modes: HumidifierMode[];
    fan_speed_mode?: string[];
    fan_speed?: number;
    tank_show?: boolean;
  };
};

export type HumidifierFanEntity = HassEntityBase & {
  attributes: HassEntityAttributeBase & {
    preset_modes: HumidifierFanMode[];
    preset_mode: HumidifierFanMode;
  };
};

export const HUMIDIFIER_SUPPORT_MODES = 1;

export const HUMIDIFIER_DEVICE_CLASS_HUMIDIFIER = "humidifier";
export const HUMIDIFIER_DEVICE_CLASS_DEHUMIDIFIER = "dehumidifier";

const humidifierFanModeOrdering: { [key in HumidifierFanMode]: number } = {
  low: 0,
  silent: 0,
  medium: 1,
  turbo: 2,
  high: 2
};

const humidifierModeOrdering: { [key in HumidifierMode]: number } = {
  off: 0,
  set: 1,
  smart: 2,
  continuous: 3,
  dry: 4,
};

export const compareClimateHumidifierModes = (mode1: HumidifierMode, mode2: HumidifierMode) =>
  humidifierModeOrdering[mode1] - humidifierModeOrdering[mode2];

  export const compareClimateFanHumidifierModes = (fanMode1: HumidifierFanMode, fanMode2: HumidifierFanMode) =>
humidifierFanModeOrdering[fanMode1] - humidifierFanModeOrdering[fanMode2];
