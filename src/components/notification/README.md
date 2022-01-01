# Shapla Notification

A simple notification component for Vue 3

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/vue-components
```

# Usage

### Note

**Use only one `ShaplaNotificationContainer` component in the app.**

**You can import `Notify` anywhere of your app to trigger notification**

### Styles (with SCSS)

```scss
@use "@shapla/vue-notification/src/index.scss" as shapla;

@include shapla.notification;
```

### Javascript Instantiation

```js
import { ShaplaNotificationContainer, Notify } from "@shapla/vue-components";

export default {
  name: "Hello",

  components: {
    ShaplaNotificationContainer,
  },

  methods: {
    createNotification(type) {
      switch (type) {
        case "info":
          Notify.info("Info message");
          break;
        case "success":
          Notify.success("Success message", "Title here");
          break;
        case "warning":
          Notify.warning("Warning message", "Close after 3000ms", 3000);
          break;
        case "error":
          Notify.error("Error message", "Click me!", 5000);
          break;
      }
    },
  },
};
```

```vue
<button @click="createNotification('info')">Info</button>
<button @click="createNotification('success')">Success</button>
<button @click="createNotification('warning')">Warning</button>
<button @click="createNotification('error')">Error</button>

<shapla-notification-container position="top-right" />
```

### NotificationContainer Props

| Property        | Type    | Required | Default     | Description                                                                                        |
| --------------- | ------- | -------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `timeout`       | Number  | **no**   | `4000`      | Time to stay visible notification before auto dismiss.                                             |
| `position`      | String  | **no**   | `top-right` | Value can be 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right' |
| `showDismisses` | Boolean | **no**   | `true`      | Set `false` to hide close icon from notification                                                   |

## Notify API

- Notify.info(message, title, timeout);
- Notify.success(message, title, timeout);
- Notify.warning(message, title, timeout);
- Notify.error(message, title, timeout);

| Property  | Type   | Required | Default | Description                       |
| --------- | ------ | -------- | ------- | --------------------------------- |
| `message` | String | **yes**  | ``      | Notification message              |
| `title`   | String | **no**   | ``      | Notification title                |
| `timeout` | Number | **no**   | `4000`  | The popup timeout in milliseconds |
