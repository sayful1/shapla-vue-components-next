<template>
  <doc-tab
    heading="Chip"
    subheading="Chip component is a small, interactive element. Chips are commonly used for contacts, text, rules, icons, and photos."
    slug="shapla-chip"
    name="ShaplaChip"
    scss-mixin="chip"
    :properties="properties"
    :desc="descriptions"
  >
    <code-block heading="Basic Chip">
      <div>
        <shapla-chip text="Sayful Islam" />
      </div>
      <template #code>
        <pre><code>// file ChipDemo.vue
&lt;shapla-chip text="Sayful Islam" /&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Deletable Chip">
      <div>
        <shapla-chip text="Sayful Islam" :deletable="true" />
      </div>
      <template #code>
        <pre><code>// file ChipDemo.vue
&lt;shapla-chip text="Sayful Islam" deletable /&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Contact Chip">
      <div>
        <shapla-chip
          text="Sayful Islam"
          image-src="https://www.gravatar.com/avatar/5ba82fcf5f7f8b24097ff9f7ad4b3d5b"
        />
        <shapla-chip
          text="Sayful Islam"
          :deletable="true"
          image-src="https://www.gravatar.com/avatar/5ba82fcf5f7f8b24097ff9f7ad4b3d5b"
        />
      </div>
      <template #code>
        <pre><code>// file ChipDemo.vue
&lt;shapla-chip text="Sayful Islam" image-src="https://example.com/image-url" /&gt;
&lt;shapla-chip text="Sayful Islam" deletable image-src="https://example.com/image-url" /&gt;</code></pre>
      </template>
    </code-block>
  </doc-tab>
</template>

<script>
import { ShaplaChip} from "../../src/index.ts";
import DocTab from "../components/DocTab.vue";
import CodeBlock from "../components/CodeBlock.vue";
import {computed} from "vue";

export default {
  name: "ExampleChip",
  components: { ShaplaChip,DocTab,CodeBlock },
  setup() {
    const properties = computed(() => ShaplaChip.props);
    const descriptions = computed(() => {
      return {
        text: "Chip text.",
        imageSrc: "Chip contact image url.",
        deletable: "If set `true`, Delete icon will appear.",
        small: "a small chip with display.",
        height: "Custom height of chip.",
      };
    });
    return { properties, descriptions};
  },
};
</script>
