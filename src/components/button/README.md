# Shapla Button

A simple button, in different colors, sizes, and states

For demo and documentation, visit [documentation](https://sayfulislam.com/shapla-vue-components/vue3/docs/#/button)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/vue-components

# or use yarn
yarn add @shapla/vue-components
```

# Usage

### Styles (with SCSS)

```scss
// Add this line at top of your main scss file.
@use "@shapla/vue-components/src/index.scss" as shapla;

@include shapla.button;
```

### Javascript Instantiation

```js
import { ShaplaButton } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaButton,
  },

  methods: {
    handleClick() {
      // Handle click event
    },
  },
};
```

```html
<shapla-button @click="handleClick"></shapla-button>
```

### Props

| Property    | Type    | Required | Default   | Description                                                                             |
| ----------- | ------- | -------- | --------- | --------------------------------------------------------------------------------------- |
| `theme`     | String  | **no**   | `default` | Value can be `default` or `primary` or `secondary` or `success` or `warning` or `error` |
| `size`      | String  | **no**   | `normal`  | Value can be `normal` or `small` or `medium` or `large`                                 |
| `fullwidth` | Boolean | **no**   | `false`   | If set `true`, button will take full width.                                             |
| `disabled`  | Boolean | **no**   | `false`   | If set `true`, disabled attribute will be added.                                        |
| `outline`   | Boolean | **no**   | `false`   | If set `true`, outline style will be used.                                              |
| `rounded`   | Boolean | **no**   | `false`   | If set `true`, rounded style will be used                                               |
| `fab`       | Boolean | **no**   | `false`   | If set `true`, circle style will be used.                                               |
| `shadow`    | Boolean | **no**   | `false`   | If set `true`, box-shadow will be added around button.                                  |
| `href`      | String  | **no**   | ``        | link for href tag                                                                       |
