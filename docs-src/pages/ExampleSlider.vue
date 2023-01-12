<template>
  <doc-tab
    heading="Input: Range Slider"
    slug="shapla-range-slider"
    name="ShaplaRangeSlider"
    scss-mixin="slider"
    :properties="properties"
    :desc="descriptions"
  >
    <shapla-range-slider v-model="value" :min="0" :max="100" />
  </doc-tab>
</template>

<script>
import { ShaplaRangeSlider } from "../../src";
import DocTab from "../components/DocTab.vue";
import { computed } from "vue";

export default {
  name: "ExampleSlider",
  components: { DocTab, ShaplaRangeSlider },
  setup() {
    const properties = computed(() => ShaplaRangeSlider.props);
    const descriptions = {};
    return { properties, descriptions };
  },
  data() {
    return {
      value: 5,
    };
  },
};
</script>
