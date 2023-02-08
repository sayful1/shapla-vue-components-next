<template>
  <div :class="classes" :style="containerStyles">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  containerWidth: { type: String, default: null, required: false },
  containerHeight: { type: String, default: null, required: false },
  heightRatio: { type: Number, required: false, default: 1 },
  widthRatio: { type: Number, required: false, default: 1 },
  isRounded: { type: Boolean, required: false, default: false },
});
const classes = computed(() => {
  const _class = ["shapla-image-container"];
  if (!props.containerWidth) _class.push("is-fullwidth");
  if (props.isRounded) _class.push("is-rounded");
  return _class;
});

const containerStyles = computed(() => {
  const styles = [];

  if (props.containerWidth) {
    styles.push({ width: props.containerWidth });
    styles.push({
      height: props.containerHeight
        ? props.containerHeight
        : props.containerWidth,
    });
  } else {
    styles.push({
      paddingTop: (100 / props.widthRatio) * props.heightRatio + "%",
    });
  }

  return styles;
});
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.image-container;
</style>
