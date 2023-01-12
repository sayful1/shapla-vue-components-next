<template>
  <div class="shapla-stepper" :class="containerClasses">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from "vue";

export default defineComponent({
  name: "ShaplaStepper",
  props: {
    type: {
      type: String,
      default: "horizontal",
      validator: (value: string) =>
        ["horizontal", "vertical"].indexOf(value) !== -1,
    },
    labelPlacement: {
      type: String,
      default: "default",
      validator: (value: string) =>
        ["default", "alternative"].indexOf(value) !== -1,
    },
  },
  setup(props) {
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
    return { containerClasses };
  },
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
