<template>
  <div class="shapla-toggles" :data-id="toggleId">
    <slot />
  </div>
</template>

<script lang="ts">
import { provide, ref, defineComponent } from "vue";
import { createUUID } from "./Helper";

export default defineComponent({
  name: "ShaplaToggles",
  props: {
    accordion: { type: Boolean, default: true },
    iconPosition: {
      type: String,
      default: "left",
      validator: (value: string) => -1 !== ["left", "right"].indexOf(value),
    },
    boxedMode: { type: Boolean, default: true },
    showDivider: { type: Boolean, default: true },
    titleColor: {
      type: String,
      default: "default",
      validator: (value: string) =>
        -1 !== ["default", "primary", "secondary"].indexOf(value),
    },
  },
  setup(props) {
    const toggleId = ref(createUUID());
    const data = props;
    Object.defineProperty(data, "uuid", {
      value: toggleId.value,
      writable: false,
    });

    provide("ShaplaTogglesProvider", data);

    return {
      toggleId,
    };
  },
});
</script>
