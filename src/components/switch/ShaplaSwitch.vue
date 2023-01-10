<template>
  <label class="shapla-switch" :class="switchClasses">
    <input
        type="checkbox"
        class="shapla-switch__input"
        :checked="shouldBeChecked"
        :value="value"
        :disabled="disabled"
        @change="updateInput"
        @focus="handleFocusEvent"
        @blur="handleBlurEvent"
    >
    <span class="shapla-switch__label"><slot>{{ label }}</slot></span>
    <span class="shapla-switch__track"/>
    <span class="shapla-switch__thumb">
      <span class="shapla-switch__focus-helper"/>
    </span>
  </label>
</template>

<script lang="ts">
import {computed, reactive, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaSwitch",
  props: {
    modelValue: {type: [Boolean, String, Array], default: false},
    value: {type: String, default: "on"},
    trueValue: {type: [Boolean, String], default: true},
    falseValue: {type: [Boolean, String], default: false},
    disabled: {type: Boolean, default: false},
    readonly: {type: Boolean, default: false},
    label: {type: String, default: ""},
  },
  emits: ["update:modelValue", "focus", "blur"],
  setup(props, {emit}) {
    const state = reactive<{ isFocus: boolean }>({isFocus: false});

    const shouldBeChecked = computed(() => {
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value);
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return props.modelValue === props.trueValue;
    });

    const switchClasses = computed(() => {
      const classes = [];
      if (shouldBeChecked.value) classes.push("is-checked");
      if (props.disabled) classes.push("is-disabled");
      if (state.isFocus) classes.push("is-focused");

      return classes;
    });

    const getValue = (event: Event) => {
      const isChecked = (event.target as HTMLInputElement).checked;

      if (props.modelValue instanceof Array) {
        const newValue = [...props.modelValue];

        if (isChecked) {
          newValue.push(props.value);
        } else {
          newValue.splice(newValue.indexOf(props.value), 1);
        }

        return newValue;
      }

      return isChecked ? props.trueValue : props.falseValue;
    };

    const updateInput = (event: Event) => {
      if (!props.readonly) emit("update:modelValue", getValue(event));
    };

    const handleFocusEvent = (event: Event) => {
      if (!props.disabled && !props.readonly) {
        state.isFocus = true;
        emit("focus", getValue(event));
      }
    };

    const handleBlurEvent = (event: Event) => {
      if (!props.disabled && !props.readonly) {
        state.isFocus = false;
        emit("blur", getValue(event));
      }
    };

    return {
      shouldBeChecked,
      switchClasses,
      updateInput,
      handleFocusEvent,
      handleBlurEvent,
    };
  },
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.input-switch;
</style>
