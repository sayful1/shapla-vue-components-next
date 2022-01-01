# Shapla Side Navigation

A simple side overlay navigation. Normally to use to develop admin panel.

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
@use "shapla-css/src/index.scss" as shapla;

@include shapla.sidenav;
```

### Javascript Instantiation

```js
import { ShaplaSidenav } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaSidenav,
  },
};
```

```html
<shapla-sidenav
  :active="true"
  nav-width="300px"
  position="left"
  :show-overlay="true"
>
  Nav content goes here
</shapla-sidenav>
```

### Props

| Property      | Type    | Required | Default | Description                                     |
| ------------- | ------- | -------- | ------- | ----------------------------------------------- |
| `active`      | Boolean | **no**   | `true`  | If set `true`, side navigation will be opened.  |
| `showOverlay` | Boolean | **no**   | `true`  | If set `true`, overlay background will be shown |
| `navWidth`    | String  | **no**   | `300px` | Sidenav width in pixels.                        |
| `position`    | String  | **no**   | `left`  | Value can be `left` or `right`.                 |

## Listeners

The side navigation component fires the following events:

**`close`**: When outside area is clicked, it fires the event.

```html
<!-- template -->
<shapla-sidenav @close="handleClose"></shapla-sidenav>

<!-- method -->
methods: { handleClose(){ // Handle close event } }
```
