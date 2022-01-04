<template>
  <doc-tab
    heading="Dashboard"
    subheading="A simple dashboard layout to build your app dashboard for Vue 3"
    slug="shapla-dashboard"
    name="ShaplaDashboard"
    scss-mixin="dashboard"
    :properties="properties"
    :desc="descriptions"
  >
    <code-block>
      This doc has been created using this dashboard component.
      <template #code>
        <pre><code>&lt;shapla-dashboard
  :activate-side-nav="activeSidenav"
  title="Dashboard"
  user-display-name="Sayful Islam"
  avatar-url="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
  @open:sidenav="activeSidenav = true"
  @close:sidenav="activeSidenav = false"
&gt;
  &lt;template #sidenav-menu&gt;
    &lt;ul class="sidenav-list"&gt;
      &lt;li class="sidenav-list__item"&gt;&lt;a class="sidenav-list__link" href="">Link 1&lt;/a&gt;&lt;/li&gt;
      &lt;li class="sidenav-list__item"&gt;&lt;a class="sidenav-list__link" href="">Link 2&lt;/a&gt;&lt;/li&gt;
      &lt;li class="sidenav-list__item"&gt;&lt;a class="sidenav-list__link" href="">Link 3&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/template&gt;
  Content should goe here.
&lt;/shapla-dashboard&gt;</code></pre>
      </template>
    </code-block>
  </doc-tab>
</template>

<script>
import {ShaplaDashboard} from "../../src";
import DocTab from "../components/DocTab.vue";
import CodeBlock from "../components/CodeBlock.vue";
import {computed} from "vue";

export default {
  name: "ExampleDashboard",
  components: {DocTab, CodeBlock},
  setup() {
    const properties = computed(() => ShaplaDashboard.props);
    const descriptions = {};
    return {properties, descriptions};
  },
};
</script>
