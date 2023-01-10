<template>
  <div class="shapla-sidenav" :class="navClasses" :style="`--shapla-side-navigation-width:${navWidth}`">
    <div v-if="showOverlay" class="shapla-sidenav__background" @click="closeNav" />
    <div class="shapla-sidenav__body" :style="sidenavBodyStyle">
      <div class="shapla-sidenav__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, ref, onMounted, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaSidenav",

  props: {
    active: {type: Boolean, default: true},
    showOverlay: {type: Boolean, default: true},
    navWidth: {type: String, default: "300px"},
    position: {
      type: String, default: "left", validator: (value: string) =>
          ["left", "right", "bottom", "top"].indexOf(value) !== -1,
    },
  },

  emits: ["close"],
  setup(props, {emit}) {
    const bodyWidth = ref("300px");
    const closeNav = () => emit("close");
    const navClasses = computed(() => {
      const classes = [`shapla-sidenav--${props.position}`];
      if (props.active) classes.push("is-active");
      return classes;
    });
    const sidenavBodyStyle = computed(() => {
      if (["left", "right"].indexOf(props.position) !== -1) {
        return {width: bodyWidth.value};
      }
      return {height: bodyWidth.value};
    });

    onMounted(() => {
      bodyWidth.value = props.navWidth;
    });

    return {
      closeNav,
      navClasses,
      sidenavBodyStyle,
    };
  },
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.sidenav;
</style>
