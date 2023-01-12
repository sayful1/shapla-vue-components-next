<template>
  <doc-tab
    heading="Spinner"
    slug="shapla-spinner"
    name="ShaplaSpinner"
    scss-mixin="spinner"
    :properties="properties"
    :desc="descriptions"
  >
    <div id="app" class="shapla-vue-components--demo">
      <div class="container mx-auto">
        <button @click="active = true">Start loading</button>
        <p>Loader will be close atomically after 4 seconds.</p>
        <div class="flex space-x-4 p-4">
          <shapla-spinner
            :active="active"
            size="default"
            :single="false"
            :show-text="true"
          />
        </div>
      </div>
    </div>
  </doc-tab>
</template>

<script>
import { ShaplaSpinner } from "../../src";
import { computed, ref, watch } from "vue";
import DocTab from "../components/DocTab.vue";

export default {
  name: "ExampleSpinner",
  components: { DocTab, ShaplaSpinner },
  setup() {
    const active = ref(false);

    watch(
      () => active.value,
      (newValue) => {
        if (newValue) {
          setTimeout(() => (active.value = false), 4000);
        }
      }
    );

    const properties = computed(() => ShaplaSpinner.props);
    const descriptions = {};
    return { properties, descriptions, active };
  },
};
</script>
