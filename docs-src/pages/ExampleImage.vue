<template>
  <doc-tab
    heading="Image Container"
    subheading="The image container to specify a precisely sized container so that your layout isn't broken because of
    image loading or image errors."
    slug="shapla-image"
    name="ShaplaImage"
    scss-mixin="image-container"
    :properties="properties"
    :desc="descriptions"
  >
    <code-block heading="Fixed size">
      <image-container container-width="32px" container-height="32px">
        <img src="https://via.placeholder.com/48x48" />
      </image-container>
      <template #code>
        <pre><code>&lt;!-- template --&gt;
&lt;image-container container-width="32px" container-height="32px"&gt;
  &lt;img src="https://via.placeholder.com/48x48"&gt;
&lt;/image-container&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Fixed size: rounded">
      <image-container
        container-width="32px"
        container-height="32px"
        is-rounded
      >
        <img src="https://via.placeholder.com/48x48" />
      </image-container>
      <template #code>
        <pre><code>&lt;!-- template --&gt;
&lt;image-container container-width="32px" container-height="32px" is-rounded&gt;
  &lt;img src="https://via.placeholder.com/48x48"&gt;
&lt;/image-container&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Ratio">
      <div style="width: 420px; height: 560px">
        <image-container :width-ratio="3" :height-ratio="4">
          <img src="https://via.placeholder.com/420x560" />
        </image-container>
      </div>
      <template #code>
        <pre><code>&lt;!-- template --&gt;
&lt;image-container :width-ratio="3" :height-ratio="4"&gt;
  &lt;img src="https://via.placeholder.com/420x560"&gt;
&lt;/image-container&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Iframe support">
      <div style="width: 420px; height: 560px">
        <image-container :width-ratio="16" :height-ratio="9">
          <iframe
            width="640"
            height="360"
            allowfullscreen
            src="https://www.youtube.com/embed/YE7VzlLtp-4?showinfo=0"
          />
        </image-container>
      </div>
      <template #code>
        <pre><code>&lt;!-- template --&gt;
&lt;image-container :width-ratio="16" :height-ratio="9"&gt;
  &lt;iframe
    src="https://www.youtube.com/embed/YE7VzlLtp-4?showinfo=0"
    allowfullscreen
    width="640"
    height="360"
  /&gt;
&lt;/image-container&gt;</code></pre>
      </template>
    </code-block>
  </doc-tab>
</template>

<script>
import { computed } from "vue";
import { ShaplaImage } from "../../src";
import DocTab from "../components/DocTab.vue";
import CodeBlock from "../components/CodeBlock.vue";

export default {
  name: "ExampleImage",
  components: { CodeBlock, DocTab, "image-container": ShaplaImage },
  setup() {
    const properties = computed(() => ShaplaImage.props);
    const descriptions = {};
    return { properties, descriptions };
  },
};
</script>
