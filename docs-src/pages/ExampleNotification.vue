<template>
  <doc-tab
    heading="Notification"
    slug="shapla-notification-container"
    name="ShaplaNotificationContainer"
    scss-mixin="notification"
    :properties="properties"
    :desc="descriptions"
  >
    <div>
      <div>
        <h2>Position</h2>
        <label v-for="_position in positions" :key="_position.value">
          <input v-model="position" type="radio" :value="_position.value" />
          {{ _position.label }}
        </label>
      </div>

      <div class="space-x-4">
        <button class="shapla-button" @click="showNotification()">
          Default Notification
        </button>
        <button class="shapla-button" @click="showNotification('success')">
          Success Notification
        </button>
        <button class="shapla-button" @click="showNotification('info')">
          Info Notification
        </button>
        <button class="shapla-button" @click="showNotification('warning')">
          Warning Notification
        </button>
        <button class="shapla-button" @click="showNotification('error')">
          Error Notification
        </button>
      </div>

      <shapla-notification-container :position="position" />
    </div>
  </doc-tab>
</template>

<script>
import { Notify, ShaplaModal, ShaplaNotificationContainer } from "../../src";
import { computed } from "vue";
import DocTab from "../components/DocTab.vue";

export default {
  name: "ExampleNotification",
  components: { DocTab, ShaplaNotificationContainer },
  setup() {
    const properties = computed(() => ShaplaModal.props);
    const descriptions = {};
    const showNotification = (type = "default") => {
      if ("success" === type) {
        Notify.success({
          title: "Success!",
          timeout: 60000,
          message: "This is success message. Self close after 1 minute.",
        });
      } else if ("info" === type) {
        Notify.info("This is info message. Self close after 4 seconds", 4000);
      } else if ("warning" === type) {
        Notify.warning({
          title: "Warning!",
          message: "This is warning message. Self close after 4 seconds",
          timeout: 4000,
        });
      } else if ("error" === type) {
        Notify.error({
          title: "Error!",
          message: "This is error message. Self close after 4 seconds",
          timeout: 4000,
        });
      } else {
        Notify.default(
          "This is default message. Self close after 4 seconds",
          "Title",
          4000
        );
      }
    };

    return {
      showNotification,
      properties,
      descriptions,
    };
  },
  data() {
    return {
      position: "top-right",
      notification: {},
      positions: [
        { label: "Top Left", value: "top-left" },
        { label: "Top Center", value: "top-center" },
        { label: "Top Right", value: "top-right" },
        { label: "Bottom Left", value: "bottom-left" },
        { label: "Bottom Center", value: "bottom-center" },
        { label: "Bottom Right", value: "bottom-right" },
        { label: "Center (beta)", value: "center-center" },
      ],
    };
  },
};
</script>
