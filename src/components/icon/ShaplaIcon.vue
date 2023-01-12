<template>
  <span :class="classes"><slot /></span>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "ShaplaIcon",
  props: {
    size: {
      type: String,
      required: false,
      default: null,
      validator: (value: string) =>
        ["small", "medium", "large"].indexOf(value) !== -1,
    },
    hoverable: { type: Boolean, default: false },
  },
  setup(props) {
    const classes = computed(() => {
      const classes = ["shapla-icon"];
      if (props.hoverable) classes.push("is-hoverable");
      if (props.size) classes.push("is-" + props.size);

      return classes;
    });
    return {
      classes,
    };
  },
});
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.icon-container;
</style>
