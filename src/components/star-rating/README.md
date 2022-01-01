# shapla-star-rating

A simple, highly customisable star rating component for Vue 3

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

@include shapla.star-rating;
```

### Javascript Instantiation

```js
import { ShaplaStarRating } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaStarRating,
  },
  data() {
    return {
      rating: 4,
      staticRating: 4.6,
    };
  },
};
```

```vue
<shapla-star-rating v-model="rating" />

<shapla-star-rating v-model="staticRating" :is-static="true" />
```

### Props

| Property       | Type    | Required | Default           | Description                                         |
| -------------- | ------- | -------- | ----------------- | --------------------------------------------------- |
| `value`        | Number  | **yes**  | ``                | The initial rating                                  |
| `is-static`    | Boolean | **no**   | `false`           | If set `true`, the rating cannot be edited.         |
| `color`        | String  | **no**   | ``                | The color of the non-highlighted portion of a star. |
| `active-color` | String  | **no**   | ``                | The color of the highlighted portion of a star.     |
| `ratings`      | Array   | **no**   | `[1, 2, 3, 4, 5]` | List of rating value                                |
