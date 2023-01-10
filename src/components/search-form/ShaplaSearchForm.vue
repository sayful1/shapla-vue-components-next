<template>
  <form
    role="search"
    method="get"
    class="shapla-search-form"
    action=""
    :style="getStyle"
    @submit.prevent="submit"
  >
    <label>
      <span class="screen-reader-text sr-only">{{ screenReaderText }}</span>
      <input
        type="search"
        class="shapla-search-form__input"
        :placeholder="placeholder"
        :value="searchValue"
        @input="input($event)"
        @search.prevent="submit"
      >
    </label>
    <button type="submit" class="shapla-search-form__submit">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    </button>
  </form>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, StyleValue} from "vue";

export default defineComponent({
  name: "ShaplaSearchForm",
  props: {
    value: {type: String, default: ""},
    placeholder: {type: String, default: "Search …"},
    screenReaderText: {type: String, default: "Search for:"},
    fontSize: {type: String, default: ""},
  },
  emits: ["input", "search"],
  setup(props, {emit}) {
    const searchValue = ref("")

    const getStyle = computed(() => {
      let styles = [];
      if (props.fontSize) {
        styles.push({"--base-font-size": props.fontSize});
      }
      return styles;
    }) as StyleValue;

    const input = (event: InputEvent | Event) => {
      let value = (event.target as HTMLInputElement).value
      emit("input", value);
      searchValue.value = value;
    }
    const submit = () => emit("search", searchValue.value)

    onMounted(() => {
      searchValue.value = props.value;
    })

    return {searchValue, getStyle, input, submit}
  }
})
</script>

<style lang="scss">
@import "shapla-css/src/colors";

.shapla-search-form {
  position: relative;
  font-size: var(--base-font-size, 16px);

  &__input {
    border: 1px solid rgba(#000, 0.16);
    border-radius: 4px;
    font-size: inherit;
    line-height: 1.2;
    padding: 0.5em 2.5em 0.5em 0.5em !important;
    height: calc(2.2em + 2px);
    width: 100%;

    &:focus {
      border-color: rgba(#000, 0.38);
      color: $text-primary;
      outline: none;
    }
  }

  &__submit {
    align-items: center;
    background: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    font-size: inherit;
    justify-content: center;
    margin: 0 !important;
    position: absolute !important;
    right: 3px;
    top: 3px;
    bottom: 3px;
    height: calc(2.2em - 4px);
    width: calc(2.2em - 4px);
    color: $text-primary;
    padding: 0;

    &:active,
    &:hover,
    &:focus {
      background-color: rgba(60, 64, 67, 0.08);
    }

    svg {
      height: 1.5em;
      width: 1.5em;
      fill: currentColor;
    }
  }
}
</style>
