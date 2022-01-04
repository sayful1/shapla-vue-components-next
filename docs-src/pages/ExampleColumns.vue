<template>
  <doc-tab
    heading="Columns"
    subheading="A simple way to build responsive columns for Vue 3"
    slug="shapla-columns"
    name="ShaplaColumns"
    slug2="shapla-column"
    name2="ShaplaColumn"
    scss-mixin="columns"
    props-heading="Props for `ShaplaColumns`"
    :properties="properties"
    :desc="descriptions"
  >
    <template #after-props>
      <section-props heading="Props for `ShaplaColumn`" :properties="properties2" :desc="desc" />
    </template>
    <code-block heading="Columns with default gap (0.75rem)">
      <columns>
        <column>
          <div class="card-column-box">Column example 1</div>
        </column>
        <column>
          <div class="card-column-box">Column example 2</div>
        </column>
        <column>
          <div class="card-column-box">Column example 3</div>
        </column>
        <column>
          <div class="card-column-box">Column example 4</div>
        </column>
      </columns>
      <template #code>
        <pre><code>&lt;columns&gt;
  &lt;column&gt;Column example 1&lt;/column&gt;
  &lt;column&gt;Column example 2&lt;/column&gt;
  &lt;column&gt;Column example 3&lt;/column&gt;
  &lt;column&gt;Column example 4&lt;/column&gt;
&lt;/columns&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Columns (centered)">
      <columns centered>
        <column :tablet="2">
          <div class="card-column-box">16%</div>
        </column>
        <column :tablet="3">
          <div class="card-column-box">25%</div>
        </column>
        <column :tablet="3">
          <div class="card-column-box">25%</div>
        </column>
        <column :tablet="2">
          <div class="card-column-box">16%</div>
        </column>
      </columns>
      <template #code>
        <pre><code>&lt;columns centered&gt;
  &lt;column :tablet="2"&gt;16%&lt;/column&gt;
  &lt;column :tablet="3"&gt;25%&lt;/column&gt;
  &lt;column :tablet="3"&gt;25%&lt;/column&gt;
  &lt;column :tablet="2"&gt;16%&lt;/column&gt;
&lt;/columns&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Columns with custom gap (1.25rem)">
      <columns multiline column-gap="1.24rem">
        <column :tablet="4">
          <div class="card-column-box">Column example 1</div>
        </column>
        <column :tablet="4">
          <div class="card-column-box">Column example 2</div>
        </column>
        <column :tablet="4">
          <div class="card-column-box">Column example 3</div>
        </column>
        <column :tablet="4">
          <div class="card-column-box">Column example 4</div>
        </column>
        <column :tablet="4">
          <div class="card-column-box">Column example 1</div>
        </column>
        <column :tablet="4">
          <div class="card-column-box">Column example 2</div>
        </column>
        <column :tablet="4">
          <div class="card-column-box">Column example 3</div>
        </column>
        <column :tablet="4">
          <div class="card-column-box">Column example 4</div>
        </column>
      </columns>
      <template #code>
        <pre><code>&lt;columns multiline column-gap="1.24rem"&gt;
  &lt;column :tablet="4"&gt;Column example 1&lt;/column&gt;
  &lt;column :tablet="4"&gt;Column example 2&lt;/column&gt;
  &lt;column :tablet="4"&gt;Column example 3&lt;/column&gt;
  &lt;column :tablet="4"&gt;Column example 4&lt;/column&gt;
  &lt;column :tablet="4"&gt;Column example 1&lt;/column&gt;
  &lt;column :tablet="4"&gt;Column example 2&lt;/column&gt;
  &lt;column :tablet="4"&gt;Column example 3&lt;/column&gt;
  &lt;column :tablet="4"&gt;Column example 4&lt;/column&gt;
&lt;/columns&gt;</code></pre>
      </template>
    </code-block>
    <code-block heading="Columns (gapless)">
      <columns gapless>
        <column>
          <div class="card-column-box">Column example 1</div>
        </column>
        <column>
          <div class="card-column-box">Column example 2</div>
        </column>
        <column>
          <div class="card-column-box">Column example 3</div>
        </column>
        <column>
          <div class="card-column-box">Column example 4</div>
        </column>
      </columns>
      <template #code>
        <pre><code>&lt;columns gapless&gt;
  &lt;column&gt;Column example 1&lt;/column&gt;
  &lt;column&gt;Column example 2&lt;/column&gt;
  &lt;column&gt;Column example 3&lt;/column&gt;
  &lt;column&gt;Column example 4&lt;/column&gt;
&lt;/columns&gt;</code></pre>
      </template>
    </code-block>
  </doc-tab>
</template>

<script>
import {ShaplaColumn, ShaplaColumns} from "../../src/index.ts";
import DocTab from "../components/DocTab.vue";
import CodeBlock from "../components/CodeBlock.vue";
import SectionProps from "../components/SectionProps.vue";
import {computed} from "vue";

export default {
  name: "ColumnsExample",
  components: {columns: ShaplaColumns, column: ShaplaColumn, DocTab, CodeBlock, SectionProps},
  setup() {
    const properties = computed(() => ShaplaColumns.props);
    const properties2 = computed(() => ShaplaColumn.props);
    const descriptions = {
      multiline: "Whenever you want to start a new line, you can also add the `multiline` property and add more column elements than would fit in a single row",
      centered: "For centering columns, you can add the `centered` property",
      vcentered: "To align your columns vertically, add the `vcentered` property to the columns container.",
      gapless: "To remove the space between the columns.",
      mobile: "By default, columns are only activated from tablet onwards. To make columns to work on mobile too, add the `mobile`",
      desktop: "To make columns works on desktop upwards",
      columnGap: "If you want to use custom column gap, you can change this value",
    };

    const desc = {
      mobile: "When screen size less than 768px.",
      tablet: "When screen size (greater than/equal to) 768px.",
      desktop: "When screen size (greater than/equal to) 1024px.",
      widescreen: "When screen size (greater than/equal to) 1280px.",
      fullhd: "When screen size (greater than/equal to) 1400px.",
    }

    return {properties, properties2, descriptions, desc}
  }
};
</script>
