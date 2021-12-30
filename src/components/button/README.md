# Shapla Button

A simple button, in different colors, sizes, and states

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/vue-button
```

# Usage

### Styles

with SCSS:

```js
import "@shapla/vue-button/src/index.scss";
```

with CSS:

```js
import "@shapla/vue-button/dist/style.css";
```

### Javascript Instantiation

```js
import ShaplaButton from "@shapla/vue-button";

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
|-------------|---------|----------|-----------|-----------------------------------------------------------------------------------------|
| `theme`     | String  | **no**   | `default` | Value can be `default` or `primary` or `secondary` or `success` or `warning` or `error` |
| `size`      | String  | **no**   | `normal`  | Value can be `normal` or `small` or `medium` or `large`                                 |
| `fullwidth` | Boolean | **no**   | `false`   | If set `true`, button will take full width.                                             |
| `disabled`  | Boolean | **no**   | `false`   | If set `true`, disabled attribute will be added.                                        |
| `outline`   | Boolean | **no**   | `false`   | If set `true`, outline style will be used.                                              |
| `rounded`   | Boolean | **no**   | `false`   | If set `true`, rounded style will be used                                               |
| `fab`       | Boolean | **no**   | `false`   | If set `true`, circle style will be used.                                               |
| `shadow`    | Boolean | **no**   | `false`   | If set `true`, box-shadow will be added around button.                                  |
