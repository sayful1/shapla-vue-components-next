<template>
  <div
    ref="element"
    class="shapla-select-field"
    :class="{ 'is-searchable': searchable }"
  >
    <div class="shapla-select-field__control">
      <ShaplaInput
        :id="id"
        :label="label"
        :model-value="getLabelFromValue"
        :name="name"
        :required="required"
        :autocomplete="autocomplete"
        :has-error="hasError"
        :has-success="hasSuccess"
        :readonly="state.isReadonly"
        :disabled="disabled"
        @focus="handleFocusEvent"
        @blur="handleBlurEvent"
        @keydown="handleKeydownEvent"
      >
        <template #icon-right>
          <span
            v-if="clearable && (hasSelectedOption || hasValue)"
            class="icon is-right icon--delete"
          >
            <ShaplaCross @click="clearSelectedValue" />
          </span>
          <span class="icon is-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
              />
              <path fill="none" d="M0 0h24v24H0V0z" />
            </svg>
          </span>
        </template>
      </ShaplaInput>
      <div
        v-if="multiple && state.selectedOptions.length"
        class="shapla-select-field__selected-values"
      >
        <ShaplaChip
          v-for="_option in state.selectedOptions"
          :key="_option.value"
          :deletable="true"
          :small="true"
          @delete="removeSelectedItem(_option)"
        >
          <span v-html="_option.label" />
        </ShaplaChip>
      </div>
      <ShaplaDropdownMenu
        :active="state.showDropdown"
        :max-items="5"
        role="listbox"
      >
        <template #before-content="slotProps">
          <span
            v-if="searchable && slotProps.direction === 'is-down'"
            class="shapla-dropdown-item is-search-input"
          >
            <input
              v-model="state.search"
              type="text"
              class="shapla-select-field__search"
            />
          </span>
        </template>
        <template #after-content="slotProps">
          <span
            v-if="searchable && slotProps.direction === 'is-up'"
            class="shapla-dropdown-item is-search-input"
          >
            <input
              v-model="state.search"
              type="text"
              class="shapla-select-field__search"
            />
          </span>
        </template>
        <span
          v-for="_option in filteredOptions"
          :key="_option['value']"
          role="option"
          class="shapla-dropdown-item"
          :class="dropdownItemClasses(_option)"
          :aria-selected="isItemSelected(_option)"
          :data-value="_option['value']"
          @click="selectOption(_option)"
        >
          <span v-html="_option['label']" />
          <span v-if="isItemSelected(_option)" class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </span>
        </span>
        <span
          v-if="!filteredOptions.length"
          class="shapla-dropdown-item is-link no-options"
        >
          <slot name="no-options">{{ noOptionsText }}</slot>
        </span>
      </ShaplaDropdownMenu>
    </div>
    <small
      v-if="hasError"
      class="shapla-text-field__help-text is-invalid"
      v-html="validationText"
    />
    <small
      v-if="helpText"
      class="shapla-text-field__help-text"
      v-html="helpText"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import ShaplaChip from "../chip/ShaplaChip.vue";
import ShaplaCross from "../cross/ShaplaCross.vue";
import ShaplaDropdownMenu from "../dropdown/ShaplaDropdownMenu.vue";
import ShaplaInput from "../input/ShaplaInput.vue";

interface SelectOptionInterface {
  label: string;
  value: string;
}

const props = defineProps({
  label: { type: String, default: "" },
  modelValue: { type: [String, Number, Boolean, Array], default: null },
  options: {
    type: Array as PropType<
      (string | number | boolean | Record<string, string | number | boolean>)[]
    >,
    default: () => [],
  },
  labelKey: { type: String, default: "label" },
  valueKey: { type: String, default: "value" },
  clearable: { type: Boolean, default: true },
  autocomplete: { type: String, default: null },
  name: { type: String, default: null, required: false },
  id: { type: String, default: null, required: false },
  helpText: { type: String, default: null, required: false },
  validationText: { type: String, default: null, required: false },
  hasError: { type: Boolean, default: false },
  hasSuccess: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  searchable: { type: Boolean, default: false },
  closeOnSelect: { type: Boolean, default: true },
  clearSearchOnSelect: { type: Boolean, default: true },
  multiple: { type: Boolean, default: false },
  noOptionsText: { type: String, default: "Sorry, no matching options." },
  singularSelectedText: { type: String, default: "item selected" },
  pluralSelectedText: { type: String, default: "items selected" },
});
const emit = defineEmits(["update:modelValue"]);
const element = ref<HTMLElement | null>(null);
const state = reactive<{
  selectedOption: SelectOptionInterface | null;
  selectedOptions: SelectOptionInterface[];
  isReadonly: boolean;
  showDropdown: boolean;
  search: string;
}>({
  selectedOption: null,
  selectedOptions: [],
  isReadonly: false,
  showDropdown: false,
  search: "",
});
const emitEvent = (value: string | string[]) =>
  emit("update:modelValue", value);

const filteredOptions = computed<SelectOptionInterface[]>(() => {
  if (props.options.length < 1) return [];
  const newOptions: SelectOptionInterface[] = [];
  props.options.forEach((option) => {
    if (["string", "number", "boolean"].includes(typeof option)) {
      newOptions.push({
        label: option.toString(),
        value: option.toString(),
      });
    } else if (typeof option == "object") {
      newOptions.push({
        label: option[props.labelKey].toString(),
        value: option[props.valueKey].toString(),
      });
    }
  });

  if (state.search.length) {
    return newOptions.filter(
      (option) =>
        option["label"].toLowerCase().includes(state.search.toLowerCase()) ||
        option["value"].toLowerCase().includes(state.search.toLowerCase())
    );
  }

  return newOptions;
});
const getLabelFromValue = computed(() => {
  let label = "";
  if (props.modelValue && !props.multiple) {
    filteredOptions.value.forEach((option) => {
      if (option["value"] == props.modelValue) {
        label = option["label"];
      }
    });
  }
  if (props.multiple && state.selectedOptions.length) {
    if (state.selectedOptions.length > 1) {
      label = `${state.selectedOptions.length} ${props.pluralSelectedText}`;
    } else {
      label = `${state.selectedOptions.length} ${props.singularSelectedText}`;
    }
  }
  return label;
});
const hasValue = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return !!props.modelValue.length;
  }
  return !(
    props.modelValue === null ||
    props.modelValue === "" ||
    props.modelValue === undefined
  );
});
const hasSelectedOption = computed(() => {
  return !!(
    state.selectedOption &&
    typeof state.selectedOption === "object" &&
    Object.keys(state.selectedOption).length
  );
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (Array.isArray(newValue) && props.multiple) {
      const _values = newValue.map((_item) => _item.toString());
      state.selectedOptions = filteredOptions.value.filter(
        (option) => _values.indexOf(option["value"]) !== -1
      );
    }
    if (!newValue) {
      state.selectedOption = null;
    }
  }
);

onMounted(() => {
  window.addEventListener("click", (event: Event) => {
    if (
      !(element.value as HTMLElement | null)?.contains(
        event.target as HTMLElement
      )
    ) {
      state.showDropdown = false;
    }
  });
  if (props.multiple && Array.isArray(props.modelValue)) {
    const _values = props.modelValue.map((_item) => _item.toString());
    state.selectedOptions = filteredOptions.value.filter(
      (option) => _values.indexOf(option["value"]) !== -1
    );
  }
});

const handleFocusEvent = () => {
  state.isReadonly = true;
  state.showDropdown = true;
};
const handleBlurEvent = () => {
  setTimeout(() => (state.isReadonly = false), 200);
};
const isItemSelected = (option: SelectOptionInterface) => {
  return Array.isArray(props.modelValue)
    ? props.modelValue.includes(option["value"])
    : props.modelValue == option["value"];
};

const dropdownItemClasses = (option: SelectOptionInterface) => {
  const classes = [];
  if (isItemSelected(option)) classes.push("is-active");
  if (
    hasSelectedOption.value &&
    state.selectedOption &&
    state.selectedOption["value"] === option["value"]
  )
    classes.push("is-hover");

  return classes;
};

const clearSelectedValue = () => {
  if (props.clearable) {
    state.selectedOption = null;
    state.selectedOptions = [];
    emitEvent(props.multiple ? [] : "");
  }
};

const selectOption = (option: SelectOptionInterface) => {
  if (props.multiple) {
    if (!state.selectedOptions.find((word) => word.value == option.value)) {
      state.selectedOptions.push(option);
      const values = state.selectedOptions.map((_option) => _option.value);
      emitEvent(values);
    }
  } else {
    state.selectedOption = option;
    emitEvent(state.selectedOption["value"]);
  }

  if (props.closeOnSelect && !props.multiple) {
    state.showDropdown = false;
  }

  if (props.clearSearchOnSelect) {
    state.search = "";
  }
};

const removeSelectedItem = (_option: SelectOptionInterface) => {
  state.selectedOptions.splice(state.selectedOptions.indexOf(_option), 1);
  emitEvent(
    state.selectedOptions.length
      ? state.selectedOptions.map((option) => option.value)
      : []
  );
};

const scrollIfNeeded = (direction: string) => {
  const dropdownContent = (element.value as HTMLElement).querySelector(
      ".shapla-dropdown-menu__content"
    ) as HTMLElement,
    hoverEl = dropdownContent.querySelector(
      ".shapla-dropdown-item.is-hover"
    ) as HTMLElement,
    hoverElHeight = hoverEl ? hoverEl.clientHeight : 0,
    hoverElFromTop = hoverEl ? hoverEl.offsetTop : 0;

  if ("up" === direction && hoverElFromTop < dropdownContent.clientHeight) {
    dropdownContent.scrollTop =
      hoverElFromTop + hoverElHeight - dropdownContent.clientHeight;
  }

  if ("down" === direction) {
    setTimeout(() => {
      dropdownContent.scrollTop =
        hoverElFromTop + hoverElHeight - dropdownContent.clientHeight;
    }, 50);
  }
};

const handleKeydownEvent = (event: KeyboardEvent) => {
  const indexOfSelectedOption = state.selectedOption
    ? filteredOptions.value.indexOf(state.selectedOption)
    : -1;
  // Go Up
  if ("ArrowUp" === event.code) {
    const preIndex = indexOfSelectedOption - 1;
    if (preIndex >= 0) {
      state.selectedOption = filteredOptions.value[preIndex];
    }

    scrollIfNeeded("up");
  }
  // Go Down
  if ("ArrowDown" === event.code) {
    const nextIndex = indexOfSelectedOption + 1;
    if (nextIndex < filteredOptions.value.length) {
      state.selectedOption = filteredOptions.value[nextIndex];
    }

    scrollIfNeeded("down");
  }
  // Select item
  if ("Enter" === event.code) {
    // Go Down
    if (state.selectedOption) {
      selectOption(state.selectedOption);
    }
    state.isReadonly = false;
    state.showDropdown = false;
    (
      (element.value as HTMLElement).querySelector("input") as HTMLInputElement
    ).blur();
  }
};
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.select;
</style>
