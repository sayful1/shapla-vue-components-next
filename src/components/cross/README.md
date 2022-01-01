# Shapla Cross

A versatile delete cross for Vue 3

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/vue-components
```

# Usage

### Styles (with Sass)

```scss
@use "@shapla/vue-components/src/index.scss" as shapla;

@include shapla.delete-icon;
```

### Javascript Instantiation

```js
import { ShaplaCross } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaCross,
  },

  methods: {
    handleClick() {
      // Handle click event
    },
  },
};
```

```vue
<shapla-cross @click="handleClick" />
```

### Props

| Property    | Type   | Required | Default  | Description                                              |
| ----------- | ------ | -------- | -------- | -------------------------------------------------------- |
| `size`      | String | **no**   | `normal` | Value can be `normal` or `small` or `medium` or `large`. |
| `ariaLabel` | String | **no**   | `close`  | Value for html `aria-label` attribute                    |

```vue
<shapla-cross size="large" />
```
