<template>
  <doc-tab
    heading="Confirm Dialog"
    slug="shapla-confirm-container"
    name="ShaplaConfirmContainer"
    :properties="properties"
    :desc="descriptions"
  >
    <div>
      <shapla-button @click="openConfirmModal">Confirm</shapla-button>
      <span>&nbsp;</span>
      <shapla-button @click="openAlertModal">Alert</shapla-button>

      <shapla-confirm-container />
    </div>
  </doc-tab>
</template>

<script>
import { ShaplaConfirmContainer, Dialog, ShaplaButton } from "../../src";
import DocTab from "../components/DocTab.vue";
import { computed } from "vue";

export default {
  name: "ExampleConfirmDialog",
  components: { DocTab, ShaplaConfirmContainer, ShaplaButton },
  setup() {
    const openConfirmModal = () => {
      Dialog.confirm("Are you sure to delete the item?").then((confirm) => {
        if (confirm) {
          console.log("Confirmed");
        }
      });
    };

    const openAlertModal = () => {
      Dialog.alert({
        message: "You need to click Ok button to close it.",
        title: "Simple Alert",
      });
    };

    const properties = computed(() => ShaplaConfirmContainer.props);
    const descriptions = {};

    return {
      openAlertModal,
      openConfirmModal,
      properties,
      descriptions,
    };
  },
};
</script>
