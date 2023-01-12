<template>
  <doc-tab
    heading="Button"
    subheading="A simple <strong>button</strong>, in different colors, sizes, and states"
    slug="shapla-button"
    name="ShaplaButton"
    scss-mixin="button"
    :properties="properties"
    :desc="descriptions"
  >
    <code-block heading="Color Theme">
      <div class="shapla-buttons">
        <shapla-button @click="handleClick">Default</shapla-button>
        <shapla-button theme="primary">Primary</shapla-button>
        <shapla-button theme="secondary">Secondary</shapla-button>
        <shapla-button theme="success">Success</shapla-button>
        <shapla-button theme="warning">Warning</shapla-button>
        <shapla-button theme="error">Error</shapla-button>
      </div>
      <template #code>
        <pre><code> // file ButtonDemo.vue
&lt;shapla-button @click="handleClick"&gt;Default&lt;/shapla-button&gt;
&lt;shapla-button theme="primary"&gt;Primary&lt;/shapla-button&gt;
&lt;shapla-button theme="secondary"&gt;Secondary&lt;/shapla-button&gt;
&lt;shapla-button theme="success"&gt;Success&lt;/shapla-button&gt;
&lt;shapla-button theme="warning"&gt;Warning&lt;/shapla-button&gt;
&lt;shapla-button theme="error"&gt;Error&lt;/shapla-button&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Disabled Status">
      <div class="shapla-buttons">
        <shapla-button disabled>Default disabled</shapla-button>
        <shapla-button theme="primary" disabled>Primary disabled</shapla-button>
        <shapla-button theme="secondary" disabled
          >Secondary disabled</shapla-button
        >
        <shapla-button theme="success" disabled>Success disabled</shapla-button>
        <shapla-button theme="warning" disabled>Warning disabled</shapla-button>
        <shapla-button theme="error" disabled>Error disabled</shapla-button>
      </div>
      <template #code>
        <pre><code> // file ButtonDemo.vue
&lt;shapla-button disabled&gt;Default disabled&lt;/shapla-button&gt;
&lt;shapla-button theme="primary" disabled&gt;Primary disabled&lt;/shapla-button&gt;
&lt;shapla-button theme="secondary" disabled&gt;Secondary disabled&lt;/shapla-button&gt;
&lt;shapla-button theme="success" disabled&gt;Success disabled&lt;/shapla-button&gt;
&lt;shapla-button theme="warning" disabled&gt;Warning disabled&lt;/shapla-button&gt;
&lt;shapla-button theme="error" disabled&gt;Error disabled&lt;/shapla-button&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Link Button">
      <div class="shapla-buttons">
        <shapla-button href="https://example.com" target="_blank"
          >Link Default</shapla-button
        >
        <shapla-button
          theme="primary"
          href="https://example.com"
          target="_blank"
          >Link Primary</shapla-button
        >
        <shapla-button
          theme="secondary"
          href="https://example.com"
          target="_blank"
          >Link Secondary</shapla-button
        >
        <shapla-button
          theme="success"
          href="https://example.com"
          target="_blank"
          >Link Success</shapla-button
        >
        <shapla-button
          theme="warning"
          href="https://example.com"
          target="_blank"
          >Link Warning</shapla-button
        >
        <shapla-button theme="error" href="https://example.com" target="_blank"
          >Link Error</shapla-button
        >
      </div>
      <template #code>
        <pre><code> // file ButtonDemo.vue
&lt;shapla-button href="https://example.com" target="_blank"&gt;Link Default&lt;/shapla-button&gt;
&lt;shapla-button theme="primary" href="https://example.com" target="_blank"&gt;Link Primary&lt;/shapla-button&gt;
&lt;shapla-button theme="secondary" href="https://example.com" target="_blank"&gt;Link Secondary&lt;/shapla-button&gt;
&lt;shapla-button theme="success" href="https://example.com" target="_blank"&gt;Link Success&lt;/shapla-button&gt;
&lt;shapla-button theme="warning" href="https://example.com" target="_blank"&gt;Link Warning&lt;/shapla-button&gt;
&lt;shapla-button theme="error" href="https://example.com" target="_blank"&gt;Link Error&lt;/shapla-button&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Size">
      <div class="shapla-buttons">
        <shapla-button size="small">Small Button</shapla-button>
        <shapla-button size="medium">Medium Button</shapla-button>
        <shapla-button size="large">Large Button</shapla-button>
      </div>
      <template #code>
        <pre><code> // file ButtonDemo.vue
&lt;shapla-button size="small"&gt;Small Button&lt;/shapla-button&gt;
&lt;shapla-button size="medium"&gt;Medium Button&lt;/shapla-button&gt;
&lt;shapla-button size="large"&gt;Large Button&lt;/shapla-button&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Fullwidth">
      <div class="shapla-buttons">
        <shapla-button theme="primary" fullwidth
          >Fullwidth Button</shapla-button
        >
      </div>
      <template #code>
        <pre><code> // file ButtonDemo.vue
&lt;shapla-button theme="primary" fullwidth&gt;Fullwidth Button&lt;/shapla-button&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Outline">
      <div class="shapla-buttons">
        <shapla-button outline>Default</shapla-button>
        <shapla-button outline theme="primary">Primary</shapla-button>
        <shapla-button outline theme="secondary">Secondary</shapla-button>
        <shapla-button outline theme="success">Success</shapla-button>
        <shapla-button outline theme="warning">Warning</shapla-button>
        <shapla-button outline theme="error">Error</shapla-button>
      </div>
      <template #code>
        <pre><code> // file ButtonDemo.vue
&lt;shapla-button outline&gt;Default&lt;/shapla-button&gt;
&lt;shapla-button outline theme="primary"&gt;Primary&lt;/shapla-button&gt;
&lt;shapla-button outline theme="secondary"&gt;Secondary&lt;/shapla-button&gt;
&lt;shapla-button outline theme="success"&gt;Success&lt;/shapla-button&gt;
&lt;shapla-button outline theme="warning"&gt;Warning&lt;/shapla-button&gt;
&lt;shapla-button outline theme="error"&gt;Error&lt;/shapla-button&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Outline Disabled Status">
      <div class="shapla-buttons">
        <shapla-button outline disabled>Default disabled</shapla-button>
        <shapla-button theme="primary" outline disabled
          >Primary disabled</shapla-button
        >
        <shapla-button theme="secondary" outline disabled
          >Secondary disabled</shapla-button
        >
        <shapla-button theme="success" outline disabled
          >Success disabled</shapla-button
        >
        <shapla-button theme="warning" outline disabled
          >Warning disabled</shapla-button
        >
        <shapla-button theme="error" outline disabled
          >Error disabled</shapla-button
        >
      </div>
      <template #code>
        <pre><code> // file ButtonDemo.vue
&lt;shapla-button outline disabled&gt;Default disabled&lt;/shapla-button&gt;
&lt;shapla-button theme="primary" outline disabled&gt;Primary disabled&lt;/shapla-button&gt;
&lt;shapla-button theme="secondary" outline disabled&gt;Secondary disabled&lt;/shapla-button&gt;
&lt;shapla-button theme="success" outline disabled&gt;Success disabled&lt;/shapla-button&gt;
&lt;shapla-button theme="warning" outline disabled&gt;Warning disabled&lt;/shapla-button&gt;
&lt;shapla-button theme="error" outline disabled&gt;Error disabled&lt;/shapla-button&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Button with shadow">
      <div class="shapla-buttons">
        <shapla-button shadow>Default with shadow</shapla-button>
        <shapla-button shadow theme="primary"
          >Primary with shadow</shapla-button
        >
        <shapla-button shadow theme="secondary"
          >Secondary with shadow</shapla-button
        >
        <shapla-button fab shadow>+</shapla-button>
      </div>
      <template #code>
        <pre><code> // file ButtonDemo.vue
&lt;shapla-button shadow&gt;Default with shadow&lt;/shapla-button&gt;
&lt;shapla-button shadow theme="primary"&gt;Primary with shadow&lt;/shapla-button&gt;
&lt;shapla-button shadow theme="secondary"&gt;Secondary with shadow&lt;/shapla-button&gt;
&lt;shapla-button shadow fab&gt;+&lt;/shapla-button&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="FAB Button">
      <div class="shapla-buttons">
        <shapla-button fab theme="primary">+</shapla-button>
        <shapla-button fab size="large" theme="secondary">+</shapla-button>
      </div>
      <template #code>
        <pre><code> // file ButtonDemo.vue
&lt;shapla-button fab theme="secondary"&gt;+&lt;/shapla-button&gt;
&lt;shapla-button fab size="large" theme="secondary"&gt;+&lt;/shapla-button&gt;</code></pre>
      </template>
    </code-block>
  </doc-tab>
</template>

<script>
import { ShaplaButton } from "../../src/index.ts";
import DocTab from "../components/DocTab.vue";
import CodeBlock from "../components/CodeBlock.vue";
import { computed } from "vue";

export default {
  name: "ExampleButton",
  components: { CodeBlock, DocTab, ShaplaButton },
  setup() {
    const handleClick = () => {
      alert("Click event");
    };
    const properties = computed(() => ShaplaButton.props);
    const descriptions = computed(() => {
      return {
        theme:
          "Value can be `default` or `primary` or `secondary` or `success` or `warning` or `error`.",
        size: "Value can be `normal` or `small` or `medium` or `large`.",
        fullwidth: "If set `true`, button will take full width. ",
        disabled: "If set `true`, disabled attribute will be added.",
        outline: "If set `true`, outline style will be used.",
        rounded: "If set `true`, rounded style will be used.",
        fab: "If set `true`, circle style will be used.",
        shadow: "If set `true`, box-shadow will be added around button.",
        loading: "If set `true`, loading circle will be visible inside button.",
      };
    });
    return { handleClick, properties, descriptions };
  },
};
</script>
