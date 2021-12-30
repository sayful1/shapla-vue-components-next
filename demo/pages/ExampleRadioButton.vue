<template>
  <doc-tab
    heading="Radio Button"
    slug="shapla-radio-button"
    name="ShaplaRadioButton"
    scss-mixin="radio"
    :properties="properties"
    :desc="descriptions"
  >
    <div>
      <shapla-radio-button
        v-for="_option in testOptions"
        :key="_option.value"
        v-model="radioTest"
        :label="_option.label"
        :value="_option.value"
      />
      <br style="margin-bottom: 1rem">
      <pre><code>{{ radioTest }}</code></pre>
    </div>
  </doc-tab>
</template>

<script>
import {ShaplaRadioButton} from "../../src";
import DocTab from "../components/DocTab.vue";
import {computed} from "vue";

export default {
  name: "ExampleRadioButton",
  components: {DocTab, ShaplaRadioButton},
  setup() {
    const properties = computed(() => ShaplaRadioButton.props);
    const descriptions = {}
    return {properties, descriptions}
  },
  data() {
    return {
      radioTest: "",
      testOptions: [
        {label: "One", value: "one"},
        {label: "Two", value: "two"},
        {label: "Three", value: "three"},
      ],
    };
  },
};
</script>
