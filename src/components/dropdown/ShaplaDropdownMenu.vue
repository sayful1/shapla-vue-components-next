<template>
  <div
      ref="root" class="shapla-dropdown-menu" :class="containerClass"
      :style="containerStyle"
      :role="role"
  >
    <div class="shapla-dropdown-menu__inner">
      <slot name="before-content" :direction="autoClass"/>
      <div class="shapla-dropdown-menu__content">
        <slot/>
      </div>
      <slot name="after-content" :direction="autoClass"/>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs, onMounted, watch, ref, computed, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaDropdownMenu",
  props: {
    active: {type: Boolean, default: false},
    role: {type: String, default: "menu"},
    right: {type: Boolean, default: false},
    up: {type: Boolean, default: false},
    maxItems: {type: Number, default: null},
    direction: {
      type: String, default: "auto",
      validator: (value: string) => ["auto", "up", "down"].indexOf(value) !== -1,
    },
  },
  setup(props) {
    const root = ref<null | HTMLElement>(null);
    const state = reactive<{ autoClass: string, isActive: boolean }>({autoClass: "", isActive: false});
    const containerClass = computed(() => {
      let classes = [];
      if (state.isActive) classes.push("is-active");
      if (state.autoClass) classes.push(state.autoClass);
      if (props.right) classes.push("is-right");
      if (props.up || props.direction === "up") classes.push("is-up");
      if (props.maxItems) classes.push("has-max-items");
      return classes;
    });
    const containerStyle = computed(() => {
      let styles = [];
      if (props.maxItems) {
        styles.push({"--max-menu-items": props.maxItems});
      }
      return styles;
    });

    const calculateDirection = () => {
      let el = root.value,
          browserHeight =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              document.body.clientHeight,
          elParent = el?.parentNode as HTMLElement,
          rect = elParent.getBoundingClientRect(),
          win = elParent.ownerDocument.defaultView as Window,
          elFromTop = rect.top + win.pageYOffset,
          spaceToBottom = browserHeight - elFromTop,
          elHeight = el?.scrollHeight;

      if (elHeight && elHeight + 15 < spaceToBottom) {
        state.autoClass = "is-down";
      } else {
        state.autoClass = "is-up";
      }
    };

    watch(
        () => props.active,
        (isActive) => {
          state.isActive = isActive;
          if (isActive && props.direction === "auto" && !props.up) {
            calculateDirection();
          }
        }
    );

    onMounted(() => {
      state.isActive = props.active;
    });

    return {...toRefs(state), root, containerClass, containerStyle};
  },
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.dropdown;
</style>
