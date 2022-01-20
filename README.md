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

## Changelogs

*v1.0.6* - Latest current version - Updated readme.md

*v1.0.5* - Changed the ion icon color to match all others (current mode color)

*v1.0.3* - Added missing ion_entity from card editor and autoconfig

*v1.0.2* - Added card editor, single file output and handling of all warning (defrost, tank_full, filter)

*v1.0.1* - Added power buttons, all fan preset modes and ion toggle

# Installation

## Install

### Manual install

1. Download and copy `midea-humidifier-card.js` from the [my repo](https://raw.githubusercontent.com/sicknesz/midea-inventor-card/master/dist/midea-humidifier-card.js) into your `config/www` directory.

2. Add the resource reference as decribed below.

### CLI install

1. Move into your `config/www` directory.

2. Grab `midea-humidifier-card.js`:

  ```
  wget https://raw.githubusercontent.com/sicknesz/midea-inventor-card/master/dist/midea-humidifier-card.js
  ```

3. Add the resource reference as decribed below.

### Add resource reference

If you configure Lovelace via YAML, add a reference to `midea-humidifier-card.js` inside your `configuration.yaml`:

  ```yaml
  resources:
    - url: /hacsfiles/midea-humidifier-card.js?v=1.0.6
      type: module
  ```

Else, if you prefer the graphical editor, use the menu to add the resource:

1. Make sure, advanced mode is enabled in your user profile (click on your user name to get there)
2. Navigate to Configuration -> Lovelace Dashboards -> Resources Tab. Hit orange (+) icon
3. Enter URL `/hacsfiles/midea-humidifier-card.js` and select type "JavaScript Module".
4. Restart Home Assistant.

## Usage

Click to add an element to your lovelace view, select the midea-humidifier-card, it will open the visual card editor
but everything should be autoconfigured properly unless you have more than one humidifier, in that case just manually click and set all fields in the editor.

### Troubleshooting

PS : If you do not see the filter and defrost entities, it's because they're disabled by default on the integration, to enable them
navigate to /config/integrations choose the midea humidifier lan integration, click on "11 entities",
search for defrost and enable the defrost and filter entities (if they're not visible look at the entity filter and disable it)
then you'll be able to add them to the card.

```
type: 'custom:midea-humidifier-card'
entity: humidifier.dehumidifier_<deviceID>
humidity_entity: sensor.dehumidifier_<deviceID>_humidity
temperature_entity: sensor.dehumidifier_<deviceID>_temperature
fan_entity: fan.dehumidifier_<deviceID>_fan
filter_entity: binary_sensor.dehumidifier_<deviceID>_replace_filter
defrost_entity: binary_sensor.dehumidifier_<deviceID>_defrosting
tank_entity: binary_sensor.dehumidifier_<deviceID>_tank_full
ion_entity: switch.dehumidifier_<deviceID>_ion_mode
show_ion_toggle: true
swap_target_and_current_humidity: true
```

## Options

| Name                             | Type    | Requirement  | Description                                 | Default              |
| -------------------------------- | ------- | ------------ | ------------------------------------------- | -------------------- |
| type                             | string  | **Required** | `custom:midea-humidifier-card`                    |
| name                             | string  | **Optional** | Card name                                   | `Midea Humidifier`   |
| entity                           | string  | **Required** | Humidifier entity ID.                       | `humidifier.<id>`    |
| fan_entity                       | string  | **Required** | Humidifiers fan entity ID.                  | `fan.<id>`           |
| humidity_entity                  | string  | **Required** | Humidifiers humidity sensor entity ID.      | `sensor.<id>`        |
| temperature_entity               | string  | **Required** | Humidifiers temperature sensor entity ID.   | `sensor.<id>`        |
| tank_entity                      | string  | **Optional** | Humidifiers tank binary sensor entity       | `binary_sensor.<id>` |
| filter_entity                    | string  | **Optional** | Humidifiers filter binary sensor entity     | `binary_sensor.<id>` |
| defrost_entity                   | string  | **Optional** | Humidifiers defrost binary sensor entity    | `binary_sensor.<id>` |
| ion_entity                       | string  | **Optional** | Humidifiers ion switch entity               | `switch.<id>`        |
| show_ion_toggle                  | boolean | **Optional** | Display the ion switch toggle icon.         | true                 |
| swap_target_and_current_humidity | boolean | **Optional** | Swap current and target humidity display    | true                 |

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

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/sicknesz)
