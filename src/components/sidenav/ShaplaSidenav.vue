<template>
  <div
    class="shapla-sidenav"
    :class="navClasses"
    :style="`--shapla-side-navigation-width:${navWidth}`"
  >
    <div
      v-if="showOverlay"
      class="shapla-sidenav__background"
      @click="closeNav"
    />
    <div class="shapla-sidenav__body" :style="sidenavBodyStyle">
      <div class="shapla-sidenav__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, onMounted, ref } from "vue";

const props = defineProps({
  active: { type: Boolean, default: true },
  showOverlay: { type: Boolean, default: true },
  navWidth: { type: String, default: "300px" },
  position: {
    type: String,
    default: "left",
    validator: (value: string) =>
      ["left", "right", "bottom", "top"].includes(value),
  },
});
const emit = defineEmits(["close"]);
const bodyWidth = ref("300px");
const closeNav = () => emit("close");
const navClasses = computed(() => {
  const classes = [`shapla-sidenav--${props.position}`];
  if (props.active) classes.push("is-active");
  return classes;
});
const sidenavBodyStyle = computed(() => {
  if (["left", "right"].includes(props.position)) {
    return { width: bodyWidth.value };
  }
  return { height: bodyWidth.value };
});

onMounted(() => {
  bodyWidth.value = props.navWidth;
});
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.sidenav;
</style>
