# Shapla Chip

Chip component is a small, interactive element. Chips are commonly used for contacts, text, rules, icons, and photos.

For demo and documentation, visit [documentation](https://sayfulislam.com/shapla-vue-components/vue3/docs/#/chip)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/vue-components
```

# Usage

### Styles (with SCSS)

```scss
@use "@shapla/vue-components/src/index.scss" as shapla;

@include shapla.delete-icon;
@include shapla.chip;
```

### Javascript Instantiation

```js
import { ShaplaChip } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaChip,
  },
};
```

```html
<shapla-chip
  text="Sayful Islam"
  :deletable="true"
  @delete="handleDeleteEvent"
/>
```

### Props

| Property    | Type    | Required | Default | Description                              |
| ----------- | ------- | -------- | ------- | ---------------------------------------- |
| `text`      | String  | **no**   | ``      | Chip text                                |
| `imageSrc`  | String  | **no**   | ``      | Chip contact image url                   |
| `deletable` | Boolean | **no**   | `false` | If set `true`, Delete icon will appear   |
| `small`     | Boolean | **no**   | `false` | If set `true`, a small chip with display |
| `height`    | String  | **no**   | `32px`  | Custom height of chip                    |

## Listeners

The chip component fires the following events:

**`delete`**: When delete icon is clicked, it fires the event.

```html
<!-- template -->
<shapla-chip @delete="handleDeleteEvent"></shapla-chip>

<!-- method -->
methods: { handleDeleteEvent(){ // Handle delete event } }
```
