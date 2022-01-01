# shapla-search-form

A simple search form design for Vue js.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/vue-components
```

# Usage

Add the component:

```js
import { ShaplaSearchForm } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    searchForm,
  },

  methods: {
    searchInput(value) {
      // Handle input event
    },
    searchSubmit(value) {
      // Handle input event
    },
  },
};
```

```html
<search-form @input="searchInput" @search="searchSubmit"></search-form>
```

### Props

| Property           | Type   | Required | Default       | Description                                             |
| ------------------ | ------ | -------- | ------------- | ------------------------------------------------------- |
| `value`            | String | **no**   | ``            | Search value                                            |
| `fontSize`         | String | **no**   | ``            | Form base font size. This can be used to control height |
| `placeholder`      | String | **no**   | `Search …`    | Input placeholder text                                  |
| `screenReaderText` | String | **no**   | `Search for:` | Screen reader text                                      |

## Listeners

The component fires the following events:

**`input`**: When user type, it fires the event with value.
**`search`**: When search is clicked, it fires the event with value.

```html
<!-- template -->
<search-form @input="searchInput" @search="searchSubmit"></search-form>

<!-- method -->
methods: { searchInput(value){ // Handle input event }, searchSubmit(value){ //
Handle input event } }
```
