<template>
  <shapla-button
    :outline="modelValue !== value"
    :theme="theme"
    :size="size"
    :fullwidth="fullwidth"
    :shadow="shadow"
    :rounded="rounded"
    @click.prevent="$emit('update:modelValue', value)"
  >
    <slot>{{ label }}</slot>
  </shapla-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShaplaButton from "../button/ShaplaButton.vue";

export default defineComponent({
  name: "ShaplaRadioButton",
  components: { ShaplaButton },
  model: { prop: "modelValue", event: "update:modelValue" },
  props: {
    label: { type: String, default: "", required: false },
    value: { type: String, default: "" },
    modelValue: { type: [String, Number, Boolean], default: "" },
    theme: {
      type: String,
      default: "default",
      validator: (value: string) =>
        ["default", "primary", "secondary"].indexOf(value) !== -1,
    },
    size: {
      type: String,
      default: "normal",
      validator: (value: string) =>
        ["small", "normal", "medium", "large"].indexOf(value) !== -1,
    },
    fullwidth: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
});
</script>
