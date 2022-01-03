# Midea Humidifier Card by [@sicknesz](https://www.github.com/sicknesz)

A companion card to the Midea Humidifier Lan integration that added tons of options comparing to previous integrations, so much that the classic
humidifier card was kinda lacking alot, so i made this card specifically for that (Midea/Inventor EVA Pro (De)Humifidier Appliances)

## Here's whats currently working

1. Control of all applicances mode (Set, Smart, Continuous, Dry)
2. Control the 3 preset mode for the fan (Silent, Medium, Turbo)
3. Warn user when tank is full

## TODO

1. add a toggle ion icon button
2. add the 2 others possible cause of warning (defrosting, air filter need to be changed)
3. Fix the cards editor

## Screenshots

![Screenshot #1](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_1.png?raw=true>)
![Screenshot #2](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_2.png?raw=true>)
![Screenshot #3](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_3.png?raw=true>)
![Screenshot #4](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_4.png?raw=true>)
![Screenshot #5](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_5.png?raw=true>)
![Screenshot #6](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_6.png?raw=true>)
![Screenshot #7](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_7.png?raw=true>)

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]

[![Discord][discord-shield]][discord]
[![Community Forum][forum-shield]][forum]

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/zJtVxUAgH)

## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:midea-humidifier-card`                   |
| name               | string  | **Optional** | Card name                                   | `Midea Humidifier`  |
| entity             | string  | **Required** | Humidifier entity ID.                       | `humidifier.<id>`   |
| fan_entity         | string  | **Optional** | Humidifiers fan entity ID.                  | `fan.<id>`          |
| humidity_entity    | string  | **Optional** | Humidifiers fan entity ID.                  | `sensor.<id>`       |
| temperature_entity | string  | **Optional** | Humidifiers fan entity ID.                  | `sensor.<id>`       |
| tank_entity        | string  | **Optional** | Humidifiers fan entity ID.                  | `sensor.<id>`       |
| entities(*)        | array   | **Required** | All entities used in the card.              | `sensor.<id>`       |

* : We need this because most card are only meant for 1 entity, this one is NOT, it handles multiples entities,
for this I use the helper function called `hasConfigOrEntitiesChanged` thats present in the frontend code but not as helper,
I re-implemented it because the card uses it to know if **any** entities has changed meaning that without it clicking on a fan's speed would
not update the UI until an action was taken on the main entity, so the yaml for this card is a bit longer that usual but it does the tricks

## Starting a new card from midea-humidifier-card

### Step 1

Click the "Use this template" button on the main page and clone the new repository to your machine

### Step 2

Install necessary modules (verified to work in node 8.x)
`yarn install` or `npm install`

### Step 3

Do a test lint & build on the project. You can see available scripts in the package.json
`npm run build`

### Step 4

Search the repository for all instances of "TODO" and handle the changes/suggestions

### Step 5

Customize to suit your needs and contribute it back to the community

[commits-shield]: https://img.shields.io/github/commit-activity/y/custom-cards/midea-humidifier-card.svg?style=for-the-badge
[commits]: https://github.com/sicknesz/midea-humidifier-card/commits/master
[devcontainer]: https://code.visualstudio.com/docs/remote/containers
[discord]: https://discord.gg/5e9yvq
[discord-shield]: https://img.shields.io/discord/330944238910963714.svg?style=for-the-badge
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/c/projects/frontend
[license-shield]: https://img.shields.io/github/license/custom-cards/midea-humidifier-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/maintenance/yes/2021.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/custom-cards/midea-humidifier-card.svg?style=for-the-badge
[releases]: https://github.com/sicknesz/midea-humidifier-card/releases
