<template>
  <div v-if="active || globallyActive" :class="containerClass">
    <div class="shapla-spinner-inner" :class="{ 'has-text': showText }">
      <div class="shapla-spinner" :class="getClass">
        <div
          v-for="index in [1, 2, 3, 4]"
          :key="index"
          :class="itemClass(index)"
        >
          <div class="shapla-spinner__circle-clipper shapla-spinner__left">
            <div class="shapla-spinner__circle" />
          </div>
          <div class="shapla-spinner__gap-patch">
            <div class="shapla-spinner__circle" />
          </div>
          <div class="shapla-spinner__circle-clipper shapla-spinner__right">
            <div class="shapla-spinner__circle" />
          </div>
        </div>
      </div>
      <div v-if="showText" class="shapla-spinner-text">
        {{ loadingText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import Spinner from "./Spinner";

export default defineComponent({
  name: "ShaplaSpinner",
  props: {
    active: { type: Boolean, default: false, required: false },
    single: { type: Boolean, default: false, required: false },
    showText: { type: Boolean, default: false, required: false },
    isRootSpinner: { type: Boolean, default: false, required: false },
    loadingText: { type: String, default: "Loading...", required: false },
    position: {
      type: String,
      default: "fixed",
      required: false,
      validator: (value: string) =>
        ["fixed", "absolute", "static"].indexOf(value) !== -1,
    },
    size: {
      type: String,
      default: "default",
      required: false,
      validator: (value: string) =>
        ["default", "large", "medium", "small"].indexOf(value) !== -1,
    },
  },
  setup(props) {
    const state = reactive<{ globallyActive: boolean }>({
      globallyActive: false,
    });
    const refreshBodyClass = (active: boolean) => {
      const body = document.querySelector("body");
      if (active) {
        body?.classList.add("has-shapla-spinner");
      } else {
        body?.classList.remove("has-shapla-spinner");
      }
    };

    const itemClass = (index: number) => {
      return ["shapla-spinner__layer", "shapla-spinner__layer-" + index];
    };

    const containerClass = computed(() => {
      const classes = ["shapla-spinner-container"];
      classes.push(`is-${props.position}`);
      return classes;
    });

    const getClass = computed(() => {
      const classes = [];
      classes.push(`is-${props.size}`);
      if (props.single) classes.push("shapla-spinner-container");
      return classes;
    });

    onMounted(() => {
      refreshBodyClass(props.active);

      Spinner.on((globallyActive: { active: boolean }) => {
        if (props.isRootSpinner) {
          state.globallyActive = globallyActive.active;
        }
      });
    });

    watch(
      () => props.active,
      (newValue) => {
        refreshBodyClass(newValue);
      }
    );

    return {
      ...toRefs(state),
      itemClass,
      containerClass,
      getClass,
    };
  },
});
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.spinner;
</style>
