<template>
  <div :class="classes" :style="styles">
    <slot/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaColumns",
  props: {
    multiline: {type: Boolean, default: false},
    centered: {type: Boolean, default: false},
    gapless: {type: Boolean, default: false},
    vcentered: {type: Boolean, default: false},
    mobile: {type: Boolean, default: false},
    desktop: {type: Boolean, default: false},
    columnGap: {type: String, default: null},
  },
  setup(props) {
    const styles = computed(() => {
      let styles: { [key: string]: string } = {};
      if (props.columnGap) {
        styles["--shapla-column-gap"] = props.columnGap;
      }
      return styles;
    });

    const classes = computed(() => {
      return {
        "shapla-columns": true,
        "is-multiline": props.multiline,
        "is-centered": props.centered,
        "is-gapless": props.gapless,
        "is-vcentered": props.vcentered,
        "is-mobile": props.mobile,
        "is-desktop": props.desktop,
        "is-variable": !!props.columnGap,
      };
    });

    return {
      styles,
      classes,
    };
  },
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.columns;
</style>
