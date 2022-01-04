<template>
  <doc-tab
    heading="Checkbox"
    slug="shapla-checkbox"
    name="ShaplaCheckbox"
    scss-mixin="checkbox"
    :properties="properties"
    :desc="descriptions"
  >
    <div>
      <shapla-checkbox v-model="singleCheckbox">Label goes here.</shapla-checkbox>
      <div class="my-4">
        Value:
        <pre><code>{{ singleCheckbox }}</code></pre>
      </div>

      <shapla-checkbox v-model="multiCheckbox" value="one">One</shapla-checkbox>
      <shapla-checkbox v-model="multiCheckbox" value="two">Two</shapla-checkbox>
      <shapla-checkbox v-model="multiCheckbox" value="three">Three</shapla-checkbox>
      <div class="my-4">
        Value:
        <pre><code>{{ multiCheckbox }}</code></pre>
      </div>
    </div>
  </doc-tab>
</template>

<script>
import {ShaplaCheckbox, ShaplaDropdown} from "../../src";
import {computed, ref} from "vue";
import DocTab from "../components/DocTab.vue";

export default {
  name: "ExampleCheckbox",
  components: {DocTab, ShaplaCheckbox},
  setup() {
    const properties = computed(() => ShaplaDropdown.props);
    const descriptions = {}
    const singleCheckbox = ref(false);
    const multiCheckbox = ref([]);
    return {
      properties,
      descriptions,
      singleCheckbox,
      multiCheckbox,
    };
  },
};
</script>

<style lang="scss"></style>
