<template>
  <label class="shapla-radio" :class="getClasses">
    <input
      type="radio"
      class="shapla-radio__button"
      :checked="shouldBeChecked"
      :value="value"
      @change="emitChange"
      @focus="isFocus = true"
      @blur="isFocus = false"
    >
    <span class="shapla-radio__label"><slot>{{ label }}</slot></span>
    <span
      class="shapla-radio__outer-circle"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    />
    <span class="shapla-radio__inner-circle" />
  </label>
</template>

<script lang="ts">
import {computed, reactive, toRefs, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaRadio",
  model: {prop: "modelValue", event: "update:modelValue"},
  props: {
    label: {type: String, default: "", required: false},
    value: {type: String, default: null},
    modelValue: {type: [String, Number, Boolean], default: ""},
    checked: {type: Boolean, default: undefined},
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    const state = reactive<{ isHovered: boolean, isFocus: boolean }>({
      isHovered: false,
      isFocus: false
    });
    const emitChange = () => emit("update:modelValue", props.value);
    const shouldBeChecked = computed(() => {
      if (typeof props.checked === "boolean") {
        return props.checked;
      }
      return props.modelValue === props.value;
    });

    const getClasses = computed(() => {
      const classes = [];
      if (shouldBeChecked.value) classes.push("is-checked");
      if (state.isFocus) classes.push("is-focused");
      if (state.isHovered) classes.push("is-hovered");
      return classes;
    });

    return {...toRefs(state), shouldBeChecked, getClasses, emitChange};
  },
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.radio;
</style>
