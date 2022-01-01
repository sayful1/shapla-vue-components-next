# Shapla Columns

A simple way to build responsive columns for Vue 3

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/vue-columns
```

# Usage

### Styles (with SCSS)

```scss
@use "@shapla/vue-components/src/index.scss" as shapla;

@include shapla.columns;
```

### Javascript Instantiation

```js
import { ShaplaColumns, ShaplaColumn } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaColumns,
    ShaplaColumn,
  },
};
```

```html
<shapla-columns multiline centered>
  <shapla-column>Column 1</shapla-column>
  <shapla-column :tablet="4" :desktop="3">Column 2</shapla-column>
  <shapla-column>Column 3</shapla-column>
  <shapla-column>Column 4</shapla-column>
</shapla-columns>
```

### Props for `ShaplaColumns`

| Property    | Type    | Required | Default   | Description                                                                                                                                                                                                                    |
| ----------- | ------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `multiline` | Boolean | **no**   | `false`   | Whenever you want to start a new line, you can also add the `multiline` property and add more column elements than would fit in a single row                                                                                   |
| `centered`  | Boolean | **no**   | `false`   | For centering columns, you can add the `centered` property                                                                                                                                                                     |
| `vcentered` | Boolean | **no**   | `false`   | To align your columns vertically, add the `vcentered` property to the columns container.                                                                                                                                       |
| `gapless`   | Boolean | **no**   | `false`   | There is 1.5rem gap between columns by default. If you want to remove the space between the columns, add the `gapless` property on the columns container                                                                       |
| `mobile`    | Boolean | **no**   | `false`   | By default, columns are only activated from tablet onwards. This means columns are stacked on top of each other on mobile. If you want columns to work on mobile too, just add the `mobile` property on the columns container. |
| `desktop`   | Boolean | **no**   | `false`   | If you only want columns on desktop upwards, just use the `desktop` property on the columns container.                                                                                                                         |
| `columnGap` | String  | **no**   | `0.75rem` | If you want to use custom column gap, you can change this value                                                                                                                                                                |

### Props for `ShaplaColumn`

If you want to change the size of a single column, you can use one of the following props
Each props can take value from 1 to 12 as it 12 columns grid system.

| Property     | Type   | Required | Default | Description                                      |
| ------------ | ------ | -------- | ------- | ------------------------------------------------ |
| `mobile`     | Number | **no**   | `null`  | When screen size less than 769px.                |
| `tablet`     | Number | **no**   | `null`  | When screen size (greater than/equal to) 769px.  |
| `desktop`    | Number | **no**   | `null`  | When screen size (greater than/equal to) 1088px. |
| `widescreen` | Number | **no**   | `null`  | When screen size (greater than/equal to) 1280px. |
| `fullhd`     | Number | **no**   | `null`  | When screen size (greater than/equal to) 1472px. |
