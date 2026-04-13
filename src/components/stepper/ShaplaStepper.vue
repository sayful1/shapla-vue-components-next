<template>
  <div class="shapla-stepper" :class="containerClasses">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType, provide } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<"horizontal" | "vertical">,
    default: "horizontal",
    validator: (value: string) => ["horizontal", "vertical"].includes(value),
  },
  labelPlacement: {
    type: String as PropType<"default" | "alternative">,
    default: "default",
    validator: (value: string) => ["default", "alternative"].includes(value),
  },
});

provide("ShaplaStepperProvider", {
  props: props,
  count: 0,
});

const containerClasses = computed(() => {
  const classes = [`is-${props.type}`];
  if (props.type === "horizontal") {
    classes.push(`has-lp-${props.labelPlacement}`);
  }
  return classes;
});
</script>

<style lang="scss">
.shapla-stepper {
  display: flex;
  width: 100%;

  &.is-horizontal {
    justify-content: space-between;
  }

  &.is-vertical {
    flex-direction: column;
  }
}
</style>
