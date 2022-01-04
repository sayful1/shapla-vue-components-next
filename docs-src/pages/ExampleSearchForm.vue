<template>
  <doc-tab
    heading="Search Form"
    slug="shapla-search-form"
    name="ShaplaSearchForm"
    scss-mixin="search-form"
    :properties="properties"
    :desc="descriptions"
  >
    <shapla-search-form />
  </doc-tab>
</template>

<script>
import {ShaplaSearchForm} from "../../src";
import DocTab from "../components/DocTab.vue";
import {computed} from "vue";

export default {
  name: "ExampleSearchForm",
  components: {DocTab, ShaplaSearchForm},
  setup() {
    const properties = computed(() => ShaplaSearchForm.props);
    const descriptions = {}
    return {properties, descriptions}
  },
};
</script>
