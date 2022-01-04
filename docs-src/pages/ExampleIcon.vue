<template>
  <doc-tab
    heading="Icon Container"
    subheading="The icon-container component is a container for any type of icon font. Because the icons can take a few seconds to load,
and because you want control over the space the icons will take, you can use the icon class
as a reliable square container that will prevent the page to <strong>jump</strong> on page load."
    slug="shapla-icon"
    name="ShaplaIcon"
    scss-mixin="icon-container"
    :properties="properties"
    :desc="descriptions"
  >
    <code-block heading="Font Awesome Icons">
      <shapla-icon size="medium" hoverable><i class="far fa-address-book" /></shapla-icon>
      <template #code>
        <pre><code>&lt;shapla-icon size="medium" hoverable&gt;
  &lt;i class="far fa-address-book" /&gt;
&lt;/shapla-icon&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Material Icons">
      <shapla-icon size="medium" hoverable>
        <span class="material-icons-outlined">home</span>
      </shapla-icon>
      <template #code>
        <pre><code>&lt;shapla-icon size="medium" hoverable&gt;
  &lt;i class="material-icons-outlined"&gt;home&lt;/i&gt;
&lt;/shapla-icon&gt;</code></pre>
      </template>
    </code-block>
  </doc-tab>
</template>

<script>
import {computed} from "vue";
import {ShaplaIcon} from "../../src";
import DocTab from "../components/DocTab.vue";
import CodeBlock from "../components/CodeBlock.vue";

export default {
  name: "ExampleIcon",
  components: {CodeBlock, DocTab, ShaplaIcon},
  setup() {
    const properties = computed(() => ShaplaIcon.props);
    const descriptions = {}
    return {properties, descriptions}
  },
};
</script>
<style lang="scss">
@import url("https://unpkg.com/@fortawesome/fontawesome-free/css/all.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>