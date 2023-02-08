<template>
  <div class="shapla-toggles" :data-id="toggleId">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, provide, ref } from "vue";
import { createUUID } from "./Helper";

const props = defineProps({
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
});

const toggleId = ref(createUUID());
const data = props;
Object.defineProperty(data, "uuid", {
  value: toggleId.value,
  writable: false,
});

provide("ShaplaTogglesProvider", data);
</script>
