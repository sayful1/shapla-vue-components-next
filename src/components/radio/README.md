# Shapla Radio

A custom radio component that works like native radio component for Vue 3.

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

@include shapla.radio;
```

### Javascript Instantiation

```js
import { ShaplaRadio } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaRadio,
  },
  data() {
    return {
      option: "one",
      options: [
        { label: "One", value: "one" },
        { label: "Two", value: "two" },
        { label: "Three", value: "three" },
      ],
    };
  },
};
```

```html
<shapla-radio
  v-for="_option in options"
  :key="_option.value"
  :value="_option.value"
  v-model="option"
>
  {{_option.label}}
</shapla-radio>
```

### Props

| Property | Type   | Required | Default | Description |
| -------- | ------ | -------- | ------- | ----------- |
| `label`  | String | **no**   | ``      | Radio label |
| `value`  | String | **no**   | ``      | Radio value |
