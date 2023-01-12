<script lang="ts">
import { defineComponent } from "vue";
import CodeHighlight from "../components/CodeHighlight.vue";
import SectionHero from "../components/SectionHero.vue";

export default defineComponent({
  name: "Home",
  components: { SectionHero, CodeHighlight },
});
</script>
<template>
  <section-hero heading="Shapla Vue Component">
    <p>A collection of reusable components for Vue 3</p>
  </section-hero>

  <section class="section section-installation">
    <h4 class="is-h4">Installation</h4>
    <code-highlight>
      <pre><code>npm install --save @shapla/vue-components</code></pre>
    </code-highlight>
  </section>

  <section class="section section-installation">
    <h4 class="is-h4">Javascript Instantiation</h4>
    <code-highlight>
      <pre><code>// file App.vue
import {ShaplaButton, ShaplaProgress} from '@shapla/vue-components';

export default {
  name: 'App',
  components: { ShaplaButton, ShaplaProgress }
}</code></pre>
    </code-highlight>
  </section>

  <section class="section section-installation">
    <h4 class="is-h4">Styles (SCSS)</h4>
    <code-highlight>
      <pre><code>// file style.scss
@use '@shapla/vue-components/src/index.scss' as shapla;

@include shapla.button;
@include shapla.progress;</code></pre>
    </code-highlight>
  </section>

  <section class="section section-customize-theme">
    <h1 class="title is-h4">Color Theme Customization</h1>

    <code-highlight>
      <pre><code>// file style.scss
@use "@shapla/vue-components/src/index.scss" as shapla with (
  $color--primary: #00d1b2;
  $color--secondary: #9c27b0;
  $color--success: #48c774;
  $color--error: #f14668;
  $color--warning: #ffdd57;
);

@include shapla.button;
@include shapla.checkbox;
@include shapla.data-table;
// include other components as your requirement </code></pre>
    </code-highlight>
  </section>
</template>
