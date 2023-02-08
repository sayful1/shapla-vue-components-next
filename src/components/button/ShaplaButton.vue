<template>
  <a v-if="href" :href="href" :class="btnClasses">
    <slot />
  </a>
  <button v-else :class="btnClasses" :disabled="disabled">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  theme: {
    type: String,
    default: "default",
    validator: (value: string) =>
      [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
      ].includes(value),
  },
  size: {
    type: String,
    default: "normal",
    validator: (value: string) =>
      ["small", "normal", "medium", "large"].includes(value),
  },
  fullwidth: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  outline: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  fab: { type: Boolean, default: false },
  shadow: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  href: { type: String, default: "" },
});

const btnClasses = computed(() => {
  const classes = ["shapla-button"];
  if (props.fullwidth) classes.push("is-fullwidth");
  if (props.outline) classes.push("is-outline");
  if (props.rounded) classes.push("is-rounded");
  if (props.fab) classes.push("is-fab");
  if (props.shadow) classes.push("has-shadow");
  if (props.loading) classes.push("is-loading");
  if ("default" !== props.theme) classes.push(`is-${props.theme}`);
  if ("normal" !== props.size) classes.push(`is-${props.size}`);

  return classes;
});
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.button;
</style>
