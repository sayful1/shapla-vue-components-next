<template>
  <div :class="modalClasses">
    <div :class="backgroundClasses" @click="backgroundClick" />
    <ShaplaCross
      v-if="showCloseIcon && !is_card"
      :fixed="true"
      size="large"
      @click="close"
    />

    <div :class="contentClasses">
      <template v-if="is_card">
        <div class="shapla-modal-card__header">
          <p class="shapla-modal-card__title">
            {{ title }}
          </p>
          <ShaplaCross v-if="showCloseIcon" size="medium" @click="close" />
        </div>
        <div class="shapla-modal-card__body">
          <slot />
        </div>
        <div
          v-if="showCardFooter"
          class="shapla-modal-card__footer is-pulled-right"
        >
          <slot name="foot">
            <button class="shapla-button" @click.prevent="close">Cancel</button>
          </slot>
        </div>
      </template>

      <template v-if="!is_card">
        <slot />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ShaplaCross from "../cross/ShaplaCross.vue";
import { refreshBodyClass } from "./helpers";
import { computed, defineEmits, defineProps, onMounted, watch } from "vue";

const props = defineProps({
  active: { type: Boolean, required: true },
  title: { type: String, default: "Untitled" },
  type: { type: String, default: "card" }, // Also support 'box', 'confirm' design
  closeOnBackgroundClick: { type: Boolean, default: true },
  showCloseIcon: { type: Boolean, default: true },
  showCardFooter: { type: Boolean, default: true },
  contentClass: { type: String, default: "" },
  backgroundTheme: {
    type: String,
    default: "dark",
    validator: (value: string) => ["dark", "light"].indexOf(value) !== -1,
  },
  contentSize: {
    type: String,
    default: "medium",
    validator: (value: string) =>
      ["small", "medium", "large", "full"].indexOf(value) !== -1,
  },
});
const emit = defineEmits(["close"]);
const modalClasses = computed(() => {
  const classes = ["shapla-modal"];
  if (props.active) classes.push("is-active");
  return classes;
});

const backgroundClasses = computed(() => {
  return ["shapla-modal-background", `is-${props.backgroundTheme}`];
});

const contentClasses = computed(() => {
  const classes = ["shapla-modal-content", `is-${props.contentSize}`];
  if (props.type === "card") classes.push("shapla-modal-card");
  if (props.type === "box") classes.push("shapla-modal-box");
  if (props.type === "confirm") classes.push("shapla-modal-confirm");
  if (!props.showCardFooter && props.type === "card") {
    classes.push("has-no-footer");
  }
  if (props.contentClass) {
    classes.push(props.contentClass);
  }
  return classes;
});

const close = () => emit("close");

const backgroundClick = () => {
  if (props.closeOnBackgroundClick) {
    close();
  }
};

const is_card = computed(() => props.type === "card");

onMounted(() => {
  refreshBodyClass(props.active);
});

watch(
  () => props.active,
  (newValue) => {
    refreshBodyClass(newValue);
  }
);
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.modal;
</style>
