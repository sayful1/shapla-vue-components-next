<template>
  <label class="shapla-checkbox" :class="labelClasses">
    <input
      type="checkbox"
      class="shapla-checkbox__input"
      :checked="shouldBeChecked"
      :value="value"
      :disabled="disabled"
      @change="updateInput"
      @focus="state.isFocus = true"
      @blur="state.isFocus = false"
    />
    <span class="shapla-checkbox__label"
      ><slot>{{ label }}</slot></span
    >
    <span class="shapla-checkbox__focus-helper" />
    <span
      class="shapla-checkbox__box-outline"
      @mouseenter="state.isHovered = true"
      @mouseleave="state.isHovered = false"
    >
      <span class="shapla-checkbox__tick-outline" />
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, reactive } from "vue";

const props = defineProps({
  label: { type: String, default: "" },
  value: { type: [String, Number, Boolean], default: "on" },
  modelValue: { type: [String, Number, Boolean, Array], default: false },
  trueValue: { type: [String, Number, Boolean], default: true },
  falseValue: { type: [String, Number, Boolean], default: false },
  disabled: { type: Boolean, default: false },
  checked: { type: Boolean, default: undefined },
});
const emit = defineEmits(["update:modelValue"]);

const state = reactive<{ isHovered: boolean; isFocus: boolean }>({
  isHovered: false,
  isFocus: false,
});

const shouldBeChecked = computed(() => {
  if (typeof props.checked === "boolean") {
    return props.checked;
  }

  if (props.modelValue instanceof Array) {
    return props.modelValue.includes(props.value);
  }
  // Note that `true-value` and `false-value` are camelCase in the JS
  return props.modelValue === props.trueValue;
});

const labelClasses = computed(() => {
  const classes = [];
  if (shouldBeChecked.value) classes.push("is-checked");
  if (state.isFocus) classes.push("is-focused");
  if (state.isHovered) classes.push("is-hovered");
  if (props.disabled) classes.push("is-disabled");
  return classes;
});

const updateInput = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked;

  if (props.modelValue instanceof Array) {
    const newValue: Array<string | number | boolean> = [];
    props.modelValue.forEach((el) => {
      newValue.push(el as string | number | boolean);
    });

    if (isChecked) {
      newValue.push(props.value);
    } else {
      newValue.splice(newValue.indexOf(props.value), 1);
    }

    emit("update:modelValue", newValue);
  } else {
    emit("update:modelValue", isChecked ? props.trueValue : props.falseValue);
  }
};
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla with (
  $checkbox-image-path: "shapla-css/src/form/checkbox"
);

@include shapla.checkbox;
</style>
