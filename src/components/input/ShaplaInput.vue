<template>
  <div class="shapla-text-field" :dir="direction" :class="containerClasses">
    <div
        class="shapla-text-field__control"
        :class="{ 'has-icons-right': hasRightIcon }"
    >
      <textarea
          v-if="isTextarea"
          :id="id"
          class="shapla-text-field__textarea"
          :class="inputClasses"
          :name="name"
          :value="modelValue"
          :required="required"
          :disabled="disabled"
          :autocomplete="autocomplete"
          :rows="rows"
          :readonly="readonly"
          placeholder=""
          :dir="direction"
          @focus="handleFocusEvent($event)"
          @keydown="handleKeydownEvent($event)"
          @blur="handleBlurEvent($event)"
          @input="handleInputEvent($event)"
      />
      <input
          v-if="!isTextarea"
          :id="id"
          class="shapla-text-field__input"
          :class="inputClasses"
          :type="type"
          :name="name"
          :value="modelValue"
          :required="required"
          :disabled="disabled"
          :autocomplete="autocomplete"
          :readonly="readonly"
          :placeholder="placeholderText"
          :dir="direction"
          @focus="handleFocusEvent($event)"
          @keydown="handleKeydownEvent($event)"
          @blur="handleBlurEvent($event)"
          @input="handleInputEvent($event)"
      >
      <label
          v-if="label"
          class="shapla-text-field__label"
          :dir="direction"
          :for="id"
          v-html="label"
      />
      <slot name="icon-right">
        <span v-if="hasSuccess" class="icon is-right">
          <svg
              class="icon-success"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </span>
        <span v-if="hasError" class="icon is-right">
          <svg
              class="icon-error"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </span>
      </slot>
    </div>
    <small
        v-if="showValidationText"
        class="shapla-text-field__help-text is-invalid"
        v-html="validationText"
    />
    <small
        v-if="showHelpText"
        class="shapla-text-field__help-text"
        v-html="helpText"
    />
  </div>
</template>

<script lang="ts">
import {computed, reactive, toRefs, defineComponent} from "vue";

const inputTypes = [
  "text",
  "email",
  "search",
  "password",
  "tel",
  "url",
  "number",
  "textarea",
  "date",
  "time",
  "datetime-local",
];
const inputSizes = ["default", "small", "medium", "large"];

export default defineComponent({
  name: "ShaplaInput",
  props: {
    type: {
      type: String, default: "text",
      validator: (value: string) => inputTypes.indexOf(value) !== -1,
    },
    size: {
      type: String, default: "default",
      validator: (value: string) => inputSizes.indexOf(value) !== -1,
    },
    modelValue: {type: [Number, String], default: null},
    label: {type: String, default: null, required: false},
    placeholder: {type: String, default: null},
    autocomplete: {type: String, default: null},
    name: {type: String, default: null, required: false},
    id: {type: String, default: null, required: false},
    helpText: {type: String, default: null, required: false},
    validationText: {type: String, default: null, required: false},
    hasError: {type: Boolean, default: false},
    hasSuccess: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    required: {type: Boolean, default: false},
    readonly: {type: Boolean, default: false},
    rows: {type: [String, Number], default: null},
    dir: {type: String, default: "ltr"},
  },
  emits: ["update:modelValue", "keydown", "focus", "blur"],
  setup(props, {emit, slots}) {
    const state = reactive<{ isHovered: boolean, isFocus: boolean }>({isHovered: false, isFocus: false});

    const direction = computed(() =>
        -1 !== ["ltr", "rtl", "auto"].indexOf(props.dir) ? props.dir : "ltr"
    );
    const hasNoLabel = computed(() => !(props.label && props.label.length));
    const placeholderText = computed(() =>
        !hasNoLabel.value ? "" : props.placeholder
    );
    const hasValue = computed(
        () =>
            !(
                props.modelValue === null ||
                props.modelValue === "" ||
                props.modelValue === undefined
            )
    );
    const showValidationText = computed(
        () =>
            !!(
                props.validationText &&
                props.validationText.length &&
                props.hasError
            )
    );
    const showHelpText = computed(
        () => !!(props.helpText && props.helpText.length)
    );
    const isTextarea = computed(() => props.type === "textarea");
    const hasRightIcon = computed(
        () => !!(slots["icon-right"] || props.hasSuccess || props.hasError)
    );
    const containerClasses = computed(() => {
      let classes = [];
      if (hasNoLabel.value) classes.push("has-no-label");
      if (props.size !== "default") classes.push(`is-${props.size}`);
      if ("ltr" !== direction.value)
        classes.push(`is-direction-${direction.value}`);
      return classes;
    });
    const inputClasses = computed(() => {
      let classes = [];
      if (props.hasSuccess) classes.push("is-valid");
      if (props.hasError) classes.push("is-invalid");
      if (hasValue.value) classes.push("has-value");
      return classes;
    });

    const handleInputEvent = (event: Event) =>
        emit("update:modelValue", (event.target as HTMLInputElement).value);
    const handleKeydownEvent = (event: Event) => emit("keydown", event);
    const handleFocusEvent = (event: Event) => {
      state.isFocus = true;
      emit("focus", (event.target as HTMLInputElement).value);
    };
    const handleBlurEvent = (event: Event) => {
      state.isFocus = false;
      emit("blur", (event.target as HTMLInputElement).value);
    };

    return {
      ...toRefs(state),
      handleInputEvent,
      handleKeydownEvent,
      handleFocusEvent,
      handleBlurEvent,
      containerClasses,
      inputClasses,
      direction,
      hasRightIcon,
      isTextarea,
      placeholderText,
      showValidationText,
      showHelpText,
    };
  },
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.text-field;
</style>
