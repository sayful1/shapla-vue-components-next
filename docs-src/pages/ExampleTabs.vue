<template>
  <doc-tab
    heading="Tabs"
    slug="shapla-tabs"
    name="ShaplaTabs"
    slug2="shapla-tab"
    name2="ShaplaTab"
    scss-mixin="tabs"
    props-heading="Props for `ShaplaTabs`"
    :properties="properties"
    :desc="descriptions"
  >
    <template #after-props>
      <section-props heading="Props for `ShaplaTab`" :properties="properties2" :desc="descriptions2" />
    </template>
    <div>
      <h2>Tabs</h2>
      <tabs alignment="center">
        <tab name="Tab 1">
          <template #name> Custom name</template>
          Tab One Content
        </tab>
        <tab name="Tab 2 (Selected)" selected> Tab Two Content</tab>
      </tabs>
      <tabs alignment="center" tab-style="boxed">
        <tab name="Tab 1 (Selected)" selected> Tab One Content</tab>
        <tab name="Tab 2"> Tab Two Content</tab>
      </tabs>
      <tabs alignment="center" tab-style="toggle">
        <tab name="Tab 1" selected> Tab One Content</tab>
        <tab name="Tab 2"> Tab Two Content</tab>
      </tabs>
      <tabs alignment="center" fullwidth>
        <tab
          name="<span class=&quot;icon is-small&quot;><i class=&quot;fas fa-image&quot; aria-hidden=&quot;true&quot;></i></span>
          <span>Pictures</span>"
          selected
        >
          <template #name>
            <span class="icon is-small"><i class="fas fa-image" aria-hidden="true" /></span>
            <span>Pictures</span>
          </template>
          Tab One Content
        </tab>
        <tab name="Tab 2"> Tab Two Content</tab>
      </tabs>
    </div>
  </doc-tab>
</template>

<script>
import {ShaplaTabs, ShaplaTab} from "../../src";
import DocTab from "../components/DocTab.vue";
import SectionProps from "../components/SectionProps.vue";
import {computed} from "vue";

export default {
  name: "ExampleTabs",
  components: {SectionProps, DocTab, tabs: ShaplaTabs, tab: ShaplaTab},
  setup() {
    const properties = computed(() => ShaplaTabs.props);
    const properties2 = computed(() => ShaplaTab.props);
    const descriptions = {};
    const descriptions2 = {}

    return {properties, properties2, descriptions, descriptions2}
  }
};
</script>
