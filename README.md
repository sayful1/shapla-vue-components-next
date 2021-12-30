# Shapla Vue Components

A collection of reusable components for Vue 3.

For Vue 2, Visit [Shapla Vue Components](https://github.com/sayful1/shapla-vue-components)

[Demo & Documentation](https://sayfulislam.com/shapla-vue-components/vue3/docs)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/vue-components
```

# Usage

For example, to use button and progress bar components:

### Styles (SCSS)

```scss
@use '@shapla/vue-components/src/index.scss' as shapla;

@include shapla.button;
@include shapla.progress;
```

### Javascript Instantiation

```js
import {ShaplaButton, ShaplaProgress} from '@shapla/vue-components';

export default {
    name: 'Hello',

    components: {
        ShaplaButton,
        ShaplaProgress
    }
}

```

```vue
<shapla-progress :value="1" :max="10" :striped="true" :animated="true" size="small" theme="primary"/>
<shapla-button @click="handleClick">button text</shapla-button>
```
