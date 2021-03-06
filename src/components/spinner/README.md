# Shapla Spinner

A loading spinner component for Vue 3

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

@include shapla.spinner;
```

### Javascript Instantiation

```js
import { ShaplaSpinner } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaSpinner,
  },

  data() {
    return {
      active: true,
    };
  },
};
```

```vue
<shapla-spinner
  :active="true"
  :single="false"
  :show-text="false"
  position="static"
/>
```

### Props

| Property      | Type    | Required | Default      | Description                                                     |
| ------------- | ------- | -------- | ------------ | --------------------------------------------------------------- |
| `active`      | Boolean | **no**   | `true`       | Spinner will be shown only when `active` value is `true`        |
| `single`      | Boolean | **no**   | `false`      | If set `true`, only primary color will be shown for all layers. |
| `showText`    | Boolean | **no**   | `false`      | If set `true`, `Loading...` text will be show beside spinner.   |
| `loadingText` | String  | **no**   | `Loading...` | Loading text                                                    |
| `position`    | String  | **no**   | `fixed`      | Value can be `fixed`, `absolute`, or `static`.                  |
| `size`        | String  | **no**   | `default`    | Value can be `default`, `small`, or `medium` or `large`.        |
