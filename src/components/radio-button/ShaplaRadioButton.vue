<template>
  <ShaplaButton
    :outline="modelValue !== value"
    :theme="theme"
    :size="size"
    :fullwidth="fullwidth"
    :shadow="shadow"
    :rounded="rounded"
    @click.prevent="handleClick"
  >
    <slot>{{ label }}</slot>
  </ShaplaButton>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import ShaplaButton from "../button/ShaplaButton.vue";

const props = defineProps({
  label: { type: String, default: "", required: false },
  value: { type: [String, Number, Boolean], default: "" },
  modelValue: { type: [String, Number, Boolean], default: "" },
  theme: {
    type: String,
    default: "default",
    validator: (value: string) =>
      ["default", "primary", "secondary"].includes(value),
  },
  size: {
    type: String,
    default: "normal",
    validator: (value: string) =>
      ["small", "normal", "medium", "large"].includes(value),
  },
  fullwidth: { type: Boolean, default: false },
  shadow: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue"]);
const handleClick = () => {
  emit("update:modelValue", props.value);
};
</script>
