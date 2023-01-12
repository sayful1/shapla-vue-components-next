<template>
  <doc-tab
    heading="Progress Bar"
    slug="shapla-progress"
    name="ShaplaProgress"
    scss-mixin="progress"
    :properties="properties"
    :desc="descriptions"
  >
    <h2>Theme</h2>
    <shapla-progress :value="10" :max="100" />
    <br />
    <shapla-progress theme="primary" :value="48" :max="100" />
    <br />
    <shapla-progress theme="secondary" :value="60" :max="100" />
    <br />
    <h2>Label</h2>
    <shapla-progress theme="primary" :value="48" :max="100" label="48%" />
    <br />
    <h2>Animated</h2>
    <shapla-progress
      theme="primary"
      :value="48"
      :max="100"
      striped
      :animated="true"
    />
    <br />
    <h2>Size</h2>
    <shapla-progress theme="primary" :value="30" :max="100" size="tiny" />
    <br />
    <shapla-progress theme="primary" :value="40" :max="100" size="small" />
    <br />
    <shapla-progress theme="primary" :value="45" :max="100" size="default" />
    <br />
    <shapla-progress theme="primary" :value="50" :max="100" size="medium" />
    <br />
    <shapla-progress theme="primary" :value="60" :max="100" size="large" />
    <br />
  </doc-tab>
</template>

<script>
import { ShaplaProgress } from "../../src";
import { computed } from "vue";
import DocTab from "../components/DocTab.vue";

export default {
  name: "ExampleProgress",
  components: { DocTab, ShaplaProgress },
  setup() {
    const properties = computed(() => ShaplaProgress.props);
    const descriptions = {};
    return { properties, descriptions };
  },
};
</script>
