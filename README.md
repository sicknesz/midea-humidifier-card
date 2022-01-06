# Midea Humidifier Card

[commits-shield]: https://img.shields.io/github/commit-activity/y/custom-cards/midea-humidifier-card.svg?style=for-the-badge
[commits]: https://github.com/sicknesz/midea-humidifier-card/commits/master
[devcontainer]: https://code.visualstudio.com/docs/remote/containers
[forum]: https://community.home-assistant.io/c/projects/frontend
[license-shield]: https://img.shields.io/github/license/custom-cards/midea-humidifier-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/maintenance/yes/2021.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/custom-cards/midea-humidifier-card.svg?style=for-the-badge
[releases]: https://github.com/sicknesz/midea-humidifier-card/releases

A companion card to the Midea Humidifier Lan integration that added tons of options comparing to previous integrations, so much that the classic
humidifier card was kinda lacking alot, so i made this card specifically for that (Midea/Inventor EVA Pro (De)Humifidier Appliances)

## Working

1. Control of all applicances mode (Set, Smart, Continuous, Dry)
2. Control the 3 preset mode for the fan (Silent, Medium, Turbo)
3. Warn user when tank is full, defrost is happening or filter needs to be change/installed

## TODO

1. ~~add a toggle ion icon button~~
2. ~~add the 2 others possible cause of warning (defrosting, air filter need to be changed)~~
3. ~~Fix any bugs left~~
4. Fix the cards editor

# Installation

## Step 1

Save midea-humidifier-card to <config directory>/www/midea-humidifier-card/midea-humidifier-card.js on your Home Assistant instance.

Example:
(replace /config with your path if different, it need to be the same folder where configuration.yaml is)

```

# EDIT THIS LINE TO FIT YOUR SYSTEM
export CONFIG_FOLDER = "/config

cd /tmp

wget https://raw.githubusercontent.com/custom-cards/midea-humidifier-card/master/dist/midea-humidifier-card.js
wget https://raw.githubusercontent.com/custom-cards/midea-humidifier-card/master/dist/midea-humidifier-card-8918c060.js
wget https://raw.githubusercontent.com/custom-cards/midea-humidifier-card/master/dist/midea-humidifier-card-editor-9a429bb4.js

mkdir -p $CONFIG_FOLDER/www/community/midea-humidifier-card/

mv ./*.js $CONFIG_FOLDER/www/community/midea-humidifier-card/

```

## Step 2

Link midea-humidifier-card inside your ui-lovelace.yaml or Raw Editor in the UI Editor

resources:

```
- url: /hacsfiles/midea-humidifier-card.js
  type: module
```

## Step 3

Add a custom element in your ui-lovelace.yaml or in the UI Editor as a Manual Card

```
type: 'custom:midea-humidifier-card'
entity: humidifier.dehumidifier_XYZ
humidity_entity: sensor.dehumidifier_XYZ_humidity
temperature_entity: sensor.dehumidifier_XYZ_temperature
fan_entity: fan.dehumidifier_XYZ_fan
filter_entity: binary_sensor.dehumidifier_XYZ_replace_filter
defrost_entity: binary_sensor.dehumidifier_XYZ_defrosting
tank_entity: binary_sensor.dehumidifier_XYZ_tank_full
ion_entity: switch.dehumidifier_XYZ_ion_mode
show_ion_toggle: true
entities:
  - humidifier.dehumidifier_XYZ
  - sensor.dehumidifier_XYZ_humidity
  - sensor.dehumidifier_XYZ_temperature
  - fan.dehumidifier_XYZ_fan
  - binary_sensor.dehumidifier_XYZ_tank_full
  - binary_sensor.dehumidifier_XYZ_defrosting
  - binary_sensor.dehumidifier_XYZ_replace_filter
  - switch.dehumidifier_XYZ_ion_mode

```

## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:midea-humidifier-card`                   |
| name              | string  | **Optional** | Card name                                   | `Midea Humidifier`  |
| entity            | string  | **Required** | Humidifier entity ID.                       | `humidifier.<id>`   |
| fan_entity        | string  | **Optional** | Humidifiers fan entity ID.                  | `fan.<id>`          |
| humidity_entity   | string  | **Optional** | Humidifiers fan entity ID.                  | `sensor.<id>`       |
| temperature_entity| string  | **Optional** | Humidifiers fan entity ID.                  | `sensor.<id>`       |
| tank_entity       | string  | **Optional** | Humidifiers fan entity ID.                  | `sensor.<id>`       |
| entities(*)       | array   | **Required** | All entities used in the card.              | `<domain>.<id>`     |

- : We need this because most card are only meant for 1 entity, this one is NOT, it handles multiples entities,
for this I use the helper function called `hasConfigOrEntitiesChanged` thats present in the frontend code but not as helper,
I re-implemented it because the card uses it to know if *any entities* has changed meaning that without it clicking on a fan's speed would
not update the UI until an action was taken on the main entity, so the yaml for this card is a bit longer that usual but it does the tricks


## Screenshots

![Screenshot #1](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_1.png?raw=true>)
![Screenshot #2](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_2.png?raw=true>)
![Screenshot #3](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_3.png?raw=true>)
![Screenshot #4](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_4.png?raw=true>)
![Screenshot #5](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_5.png?raw=true>)
![Screenshot #6](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_6.png?raw=true>)
![Screenshot #7](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_7.png?raw=true>)
![Screenshot #8](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_8.png?raw=true>)
![Screenshot #9](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_9.png?raw=true>)
![Screenshot #10](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_10.png?raw=true>)

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee: !

Salut Mec! Tu peu me soutenir en m'offrant quelques :beers: ou un :coffee: !

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/zJtVxUAgH)
