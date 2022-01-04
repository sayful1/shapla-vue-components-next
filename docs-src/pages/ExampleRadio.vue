<template>
  <doc-tab
    heading="Radio Input"
    slug="shapla-radio"
    name="ShaplaRadio"
    scss-mixin="radio"
    :properties="properties"
    :desc="descriptions"
  >
    <div>
      <shapla-radio
        v-for="_option in testOptions"
        :key="_option.value"
        v-model="radioTest"
        :label="_option.label"
        :value="_option.value"
      />

      <pre><code>{{ radioTest }}</code></pre>
    </div>
  </doc-tab>
</template>

<script>
import {ShaplaRadio} from "../../src";
import DocTab from "../components/DocTab.vue";
import {computed} from "vue";

export default {
  name: "ExampleRadio",
  components: {DocTab, ShaplaRadio},
  setup() {
    const properties = computed(() => ShaplaRadio.props);
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
