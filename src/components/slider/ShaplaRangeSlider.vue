<template>
  <div class="shapla-input-slider">
    <input
      class="shapla-input-slider__range"
      type="range"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      @input="triggerInput($event)"
    />
    <div v-show="showInput" class="shapla-input-slider__input-container">
      <input
        type="number"
        class="shapla-input-slider__input"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        @input="triggerInput($event)"
      />
    </div>
    <div
      v-show="showReset"
      class="shapla-input-slider__reset"
      title="Reset to default value"
      @click="resetToDefault"
    >
      <shapla-button shadow fab theme="primary">
        <svg
          class="shapla-input-slider__reset-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"
          />
        </svg>
      </shapla-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShaplaButton from "../button/ShaplaButton.vue";

export default defineComponent({
  name: "ShaplaRangeSlider",
  components: { ShaplaButton },
  model: { prop: "value", event: "input" },
  props: {
    modelValue: { type: [Number, String], default: null },
    default: { type: Number, default: 0 },
    min: { type: Number, default: null, required: false },
    max: { type: Number, default: null, required: false },
    step: { type: Number, default: null, required: false },
    showReset: { type: Boolean, default: true },
    showInput: { type: Boolean, default: true },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const emitEvent = (value: number) => emit("update:modelValue", value);
    const formatNumber = (value: string | number) => {
      const number =
        typeof value !== "number" ? Number.parseFloat(value) : value;
      return Number.isNaN(number) ? 0 : number;
    };

    const triggerInput = (event: Event) =>
      emitEvent(formatNumber((event.target as HTMLInputElement).value));
    const resetToDefault = () => emitEvent(formatNumber(props.default));

    return { triggerInput, resetToDefault };
  },
});
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.slider;
</style>
