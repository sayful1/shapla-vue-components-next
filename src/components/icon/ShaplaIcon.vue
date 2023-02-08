<template>
  <span :class="classes"><slot /></span>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  size: {
    type: String,
    required: false,
    default: null,
    validator: (value: string) => ["small", "medium", "large"].includes(value),
  },
  hoverable: { type: Boolean, default: false },
});

const classes = computed(() => {
  const classes = ["shapla-icon"];
  if (props.hoverable) classes.push("is-hoverable");
  if (props.size) classes.push("is-" + props.size);

  return classes;
});
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.icon-container;
</style>
