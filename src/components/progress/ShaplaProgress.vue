<template>
  <div :class="classes">
    <div
        :class="barClasses"
        role="progressbar"
        :aria-valuenow="value"
        aria-valuemin="0"
        :aria-valuemax="max"
        :style="barStyle"
    >
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaProgress",
  props: {
    label: {type: String, default: null},
    value: {type: Number, default: null},
    max: {type: Number, default: 1},
    striped: {type: Boolean, default: false},
    animated: {type: Boolean, default: false},
    size: {
      type: String, default: "default", validator: (value: string) =>
          ["default", "tiny", "small", "medium", "large"].indexOf(value) !== -1,
    },
    theme: {
      type: String, default: "default", validator: (value: string) =>
          ["default", "primary", "secondary"].indexOf(value) !== -1,
    },
  },
  setup(props) {
    const classes = computed(() => {
      let classes = ["shapla-progress"];
      if ("default" !== props.size) {
        classes.push(`is-${props.size}`);
      }

      if (!props.value && props.value !== 0) {
        classes.push("is-indeterminate");
        classes.push(`is-${props.theme}`);
      }

      return classes;
    })
    const barClasses = computed(() => {
      let classes = ["shapla-progress-bar"];
      if ("default" !== props.theme) {
        classes.push(`is-${props.theme}`);
      }
      if (props.striped) {
        classes.push(`is-striped`);
      }
      if (props.animated) {
        classes.push(`is-animated`);
      }

      return classes;
    })

    const barStyle = computed(() => {
      if (props.value) {
        let width = Math.round((props.value / props.max) * 100);
        return {width: `${width}%`};
      }
      return {};
    })

    return {classes, barClasses, barStyle}
  }
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.progress;
</style>
