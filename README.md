# Shapla Vue Components

A collection of reusable components (using Vue 3 Composition API) for Vue 3.

For Vue 2, Visit [Shapla Vue Components](https://github.com/sayful1/shapla-vue-components)

[Demo & Documentation](https://sayfulislam.com/shapla-vue-components/vue3/docs)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

Install using npm package manager

```
npm i @shapla/vue-components
```

or using yarn package manager

```
yarn add @shapla/vue-components
```

# Usage

Here we export all components script as ES module and all style as SCSS mixins. So you need to import SCSS mixin to
load style of component and also need to import ES module and register as vue component. For detail documentation,
please visit [Demo & Documentation](https://sayfulislam.com/shapla-vue-components/vue3/docs) page.

For example, to use button and progress bar components:

### Styles (SCSS)

```scss
// Add the following line at top of your scss file
@use "@shapla/vue-components/src/index.scss" as shapla;

@include shapla.button;
@include shapla.progress;
// Include other mixins as your requirement
```

### Javascript Instantiation

```js
import { ShaplaButton, ShaplaProgress } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaButton,
    ShaplaProgress,
  },
};
```

```vue
<shapla-progress
  :value="1"
  :max="10"
  :striped="true"
  :animated="true"
  size="small"
  theme="primary"
/>
<shapla-button @click="handleClick">button text</shapla-button>
```

# List of Components

- Button
- Checkbox
- Chip
- Columns/Grid System
- Confirm Dialog
- Cross/Delete Icon
- Dashboard
- Dropdown
- File Uploader
- Icon Container
- Image Container
- Text Field
- Modal/Popup
- Notification
- Progress Bar
- Radio
- Radio Button
- Search Form
- Select
- Sidenav
- Slider
- Spinner
- Star Rating
- Switch
- Data Table
- Tabs
- Toggles
