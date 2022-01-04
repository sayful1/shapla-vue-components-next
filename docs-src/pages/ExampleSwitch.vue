<template>
  <doc-tab
    heading="Star Rating"
    slug="shapla-switch"
    name="ShaplaSwitch"
    scss-mixin="input-switch"
    :properties="properties"
    :desc="descriptions"
  >
    <div id="app" class="shapla-vue-components--demo">
      <div class="container">
        <h4>Single Switch</h4>

        <shapla-switch v-model="singleSwitch"> Enable this</shapla-switch>

        <shapla-switch v-model="singleSwitch" disabled>
          Disabled Switch
        </shapla-switch>

        <pre><code>{{ singleSwitch }}</code></pre>
      </div>
      <div class="container">
        <h4>Multiple Switch</h4>

        <shapla-switch v-model="multiSwitches" value="one">
          If checked, value should be added one.
        </shapla-switch>
        <shapla-switch v-model="multiSwitches" value="two">
          If checked, value should be added two.
        </shapla-switch>
        <shapla-switch v-model="multiSwitches" value="three">
          If checked, value should be added three.
        </shapla-switch>
        <shapla-switch
          v-model="multiSwitches"
          value="four"
          readonly
          label="Readonly field, you cannot change it"
        />

        <pre><code>{{ multiSwitches }}</code></pre>
      </div>
    </div>
  </doc-tab>
</template>

<script>
import {ShaplaSwitch} from "../../src";
import DocTab from "../components/DocTab.vue";
import {computed} from "vue";

export default {
  name: "ExampleSwitch",
  components: {DocTab, ShaplaSwitch},
  setup() {
    const properties = computed(() => ShaplaSwitch.props);
    const descriptions = {}
    return {properties, descriptions}
  },
  data() {
    return {
      singleSwitch: false,
      multiSwitches: ["four"],
    };
  },
};
</script>
