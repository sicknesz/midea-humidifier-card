# Midea Humidifier Card

[commits-shield]: https://img.shields.io/github/commit-activity/y/midea-inventor-card/midea-humidifier-card.svg?style=for-the-badge
[commits]: https://github.com/sickneszmidea-inventor-card/commits/master
[devcontainer]: https://code.visualstudio.com/docs/remote/containers
[forum]: https://community.home-assistant.io/c/projects/frontend
[license-shield]: https://img.shields.io/github/license/midea-inventor-card/midea-humidifier-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/maintenance/yes/2021.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/midea-inventor-card/midea-humidifier-card.svg?style=for-the-badge
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
4. ~~swappable current and target humidity display~~
5. ~~better icons~~
6. Write the cards editor

# Installation

## Step 1

Save midea-humidifier-card to <config directory>/www/midea-humidifier-card/midea-humidifier-card.js on your Home Assistant instance.

Example:
(replace /config with your path if different, it need to be the same folder where configuration.yaml is)

```

# EDIT THIS LINE TO FIT YOUR SYSTEM
export CONFIG_FOLDER = "/config

cd /tmp

wget https://raw.githubusercontent.com/sicknesz/midea-inventor-card/master/dist/midea-humidifier-card.js
wget https://raw.githubusercontent.com/sicknesz/midea-inventor-card/master/dist/midea-humidifier-card-d30fe2cc.js
wget https://raw.githubusercontent.com/sicknesz/midea-inventor-card/master/dist/midea-humidifier-card-editor-ac43bb57.js

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

PS : If you do not see the filter and defrost entities, it's because they're disabled by default on the integration, to enable them
navigate to /config/integrations choose the midea humidifier lan integration, click on "11 entities",
search for defrost and enable the defrost and filter entities, then you'll be able to add them to the card

```
type: 'custom:midea-humidifier-card'
entity: humidifier.deshumidificateur_6734
humidity_entity: sensor.deshumidificateur_6734_humidity
temperature_entity: sensor.deshumidificateur_6734_temperature
fan_entity: fan.deshumidificateur_6734_fan
filter_entity: binary_sensor.dehumidifier_6734_replace_filter
defrost_entity: binary_sensor.dehumidifier_6734_defrosting
tank_entity: binary_sensor.deshumidificateur_6734_tank_full
ion_entity: switch.deshumidificateur_6734_ion_mode
show_ion_toggle: true
swap_target_and_current_humidity: true
entities:
  - humidifier.deshumidificateur_6734
  - sensor.deshumidificateur_6734_humidity
  - sensor.deshumidificateur_6734_temperature
  - fan.deshumidificateur_6734_fan
  - binary_sensor.deshumidificateur_6734_tank_full
  - binary_sensor.deshumidificateur_6734_defrosting
  - binary_sensor.deshumidificateur_6734_replace_filter
  - switch.deshumidificateur_6734_ion_mode
```

## Options

| Name                             | Type    | Requirement  | Description                                 | Default              |
| -------------------------------- | ------- | ------------ | ------------------------------------------- | -------------------- |
| type                             | string  | **Required** | `custom:midea-humidifier-card`                    |
| name                             | string  | **Optional** | Card name                                   | `Midea Humidifier`   |
| entity                           | string  | **Required** | Humidifier entity ID.                       | `humidifier.<id>`    |
| fan_entity                       | string  | **Required** | Humidifiers fan entity ID.                  | `fan.<id>`           |
| humidity_entity                  | string  | **Required** | Humidifiers humidity sensor entity ID.      | `sensor.<id>`        |
| temperature_entity               | string  | **Optional** | Humidifiers temperature sensor entity ID.   | `sensor.<id>`        |
| tank_entity                      | string  | **Optional** | Humidifiers tank binary sensor entity       | `binary_sensor.<id>` |
| filter_entity                    | string  | **Optional** | Humidifiers filter binary sensor entity     | `binary_sensor.<id>` |
| defrost_entity                   | string  | **Optional** | Humidifiers defrost binary sensor entity    | `binary_sensor.<id>` |
| show_ion_toggle                  | string  | **Optional** | All entities used in the card.              | `<domain>.<id>`      |
| swap_target_and_current_humidity | string  | **Optional** | All entities used in the card.              | `<domain>.<id>`      |
| entities(*)                      | array   | **Required** | All entities used in the card.              | `(...)`      |

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
![Screenshot #11](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_11.png?raw=true>)
![Screenshot #12](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_12.png?raw=true>)

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee: !

Salut Mec! Tu peu me soutenir en m'offrant quelques :beers: ou un :coffee: !

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/zJtVxUAgH)
