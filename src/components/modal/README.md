# Shapla Modal

A classic modal overlay component for Vue 3, in which you can include any content you want.

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

@include shapla.modal;
@include shapla.delete-icon;
```

### Javascript Instantiation

```js
import { ShaplaModal } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaModal,
  },

  data() {
    return {
      modalActive: true,
    };
  },

  methods: {
    closeModal() {
      this.modalActive = false;
    },
  },
};
```

```html
<button @click="modalActive = true">Open Modal</button>
<shapla-modal
  :active="modalActive"
  title="Modal Title"
  content-size="full"
  @close="closeModal"
>
  Modal content goes here.
  <div slot="foot">
    <button @close="closeModal">Close</button>
  </div>
</shapla-modal>
```

### Props

| Property                 | Type    | Required | Default    | Description                                                            |
| ------------------------ | ------- | -------- | ---------- | ---------------------------------------------------------------------- |
| `active`                 | Boolean | **yes**  | `false`    | Set `true` to show popup and set `false` to hide popup                 |
| `title`                  | String  | **no**   | `Untitled` | `title` will not show if you set `type` other than `card`              |
| `type`                   | String  | **no**   | `card`     | Currently `card`, `box` and `confirm` design available.                |
| `backgroundTheme`        | String  | **no**   | `dark`     | Value can be `dark` or `light`.                                        |
| `closeOnBackgroundClick` | Boolean | **no**   | `true`     | If set `true`, clicking outside content area will trigger close event. |
| `showCloseIcon`          | Boolean | **no**   | `true`     | If set `false`, no closing icon will be shown                          |
| `contentSize`            | String  | **no**   | `medium`   | Value can be `small`, `medium`, `large` or `full`.                     |
| `contentClass`           | String  | **no**   | ``         | Extra css class for modal content                                      |

\*_Note: `small` has content width 320px, `medium` has content width 640px, `large` has content width 960px and `full` will take full browser width_

## Listeners

The modal component fires the following events:

**`close`**: When close icon or outside content area is clicked, it fires the event.

```html
<!-- template -->
<shapla-modal @close="closeModal">
  <!-- Modal content goes here -->
</shapla-modal>

<!-- method -->
methods: { closeModal(){ this.modalActive = false; } }
```
