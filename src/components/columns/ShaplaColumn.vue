<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "ShaplaColumn",
  props: {
    mobile: { type: Number, default: null },
    tablet: { type: Number, default: null },
    desktop: { type: Number, default: null },
    widescreen: { type: Number, default: null },
    fullhd: { type: Number, default: null },
  },
  setup(props) {
    const classes = computed(() => {
      const cssClass = ["shapla-column"];
      if (props.mobile) cssClass.push(`is-${props.mobile}-mobile`);
      if (props.tablet) cssClass.push(`is-${props.tablet}-tablet`);
      if (props.desktop) cssClass.push(`is-${props.desktop}-desktop`);
      if (props.widescreen) cssClass.push(`is-${props.widescreen}-widescreen`);
      if (props.fullhd) cssClass.push(`is-${props.fullhd}-fullhd`);

      return cssClass;
    });

    return { classes };
  },
});
</script>
