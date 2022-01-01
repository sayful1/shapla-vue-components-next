# Shapla Checkbox

A custom checkbox for Vue 3 that exactly work same way as native checkbox

For demo and documentation, visit [documentation](https://sayfulislam.com/shapla-vue-components/vue3/docs/#/checkbox)

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
@use "@shapla/vue-components/src/index.scss" as shapla with (
  $checkbox-image-path: "shapla-css/src/form/checkbox"
);

@include shapla.checkbox;
```

### Javascript Instantiation

```js
import { ShaplaCheckbox } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaCheckbox,
  },

  data() {
    return {
      singleCheckbox: false,
    };
  },
};
```

```html
<shapla-checkbox v-model="singleCheckbox">Label goes here.</shapla-checkbox>
```

### Props

| Property     | Type    | Required | Default     | Description                                        |
| ------------ | ------- | -------- | ----------- | -------------------------------------------------- |
| `label`      | String  | **no**   | ``          | Checkbox label                                     |
| `value`      | String  | **no**   | `on`        | The default value for the checkbox                 |
| `trueValue`  | String  | **no**   | `true`      | The value when user checked the checkbox           |
| `falseValue` | String  | **no**   | `false`     | The value when user unchecked the checkbox         |
| `disabled`   | Boolean | **no**   | `false`     | If set `true`, Checkbox will be disabled to check. |
| `checked`    | Boolean | **no**   | `undefined` | If set `true`, Checkbox will be checked.           |
