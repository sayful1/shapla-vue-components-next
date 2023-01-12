<template>
  <doc-tab
    heading="Cross"
    subheading="The <strong>cross</strong> element is a stand-alone element that can be
      used in different contexts. On its own, it's a simple circle with a cross:"
    slug="shapla-cross"
    name="ShaplaCross"
    scss-mixin="delete-icon"
    :properties="properties"
    :desc="descriptions"
  >
    <code-block>
      <shapla-cross small @click="triggerAlert('small')" />
      <shapla-cross @click="triggerAlert('default size')" />
      <shapla-cross medium @click="triggerAlert('medium size')" />
      <shapla-cross large @click="triggerAlert('large size')" />
      <template #code>
        <pre><code> // file Hello.vue|ts|tsx|js
&lt;shapla-cross small @click="triggerAlert('small')"/&gt;
&lt;shapla-cross @click="triggerAlert('default size')"/&gt;
&lt;shapla-cross medium @click="triggerAlert('medium size')"/&gt;
&lt;shapla-cross large @click="triggerAlert('large size')"/&gt;</code></pre>
      </template>
    </code-block>
  </doc-tab>
</template>

<script>
import { ShaplaCross } from "../../src/index.ts";
import DocTab from "../components/DocTab.vue";
import CodeBlock from "../components/CodeBlock.vue";
import { computed } from "vue";

export default {
  name: "ExampleCross",
  components: { CodeBlock, ShaplaCross, DocTab },
  setup() {
    const triggerAlert = (message = "Default message") => {
      alert(message);
    };
    const properties = computed(() => ShaplaCross.props);
    const descriptions = computed(() => {
      return {
        size: "Value can be `normal` or `small` or `medium` or `large`.",
        ariaLabel: "Value for html `aria-label` attribute.",
      };
    });
    return { triggerAlert, properties, descriptions };
  },
};
</script>
