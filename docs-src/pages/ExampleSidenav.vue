<template>
  <doc-tab
    heading="Sidenav"
    slug="shapla-sidenav"
    name="ShaplaSidenav"
    scss-mixin="sidenav"
    :properties="properties"
    :desc="descriptions"
  >
    <div>
      <div @click.prevent="active = true">
        Left
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2h-20v-2zM0 9h20v2h-20v-2zM0 15h20v2h-20v-2z" />
        </svg>
      </div>
      <div @click.prevent="activeRight = true">
        Right
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2h-20v-2zM0 9h20v2h-20v-2zM0 15h20v2h-20v-2z" />
        </svg>
      </div>

      <div @click.prevent="activeBottom = true">
        Bottom
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2h-20v-2zM0 9h20v2h-20v-2zM0 15h20v2h-20v-2z" />
        </svg>
      </div>
      <div @click.prevent="activeTop = true">
        Top
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2h-20v-2zM0 9h20v2h-20v-2zM0 15h20v2h-20v-2z" />
        </svg>
      </div>

      <side-navigation
        :active="active"
        nav-width="300px"
        @close="active = false"
      >
        <a>Sidenav: Left</a>
      </side-navigation>

      <side-navigation
        :active="activeRight"
        position="right"
        nav-width="300px"
        @close="activeRight = false"
      >
        <a>Sidenav: right</a>
      </side-navigation>
      <side-navigation
        :active="activeBottom"
        position="bottom"
        @close="activeBottom = false"
      >
        <a>Sidenav: bottom</a>
      </side-navigation>
      <side-navigation
        :active="activeTop"
        position="top"
        @close="activeTop = false"
      >
        <a>Sidenav: top</a>
      </side-navigation>
    </div>
  </doc-tab>
</template>

<script>
import {ShaplaSidenav} from "../../src";
import DocTab from "../components/DocTab.vue";
import {computed} from "vue";

export default {
  name: "ExampleSidenav",
  components: {DocTab, "side-navigation": ShaplaSidenav},
  setup() {
    const properties = computed(() => ShaplaSidenav.props);
    const descriptions = {}
    return {properties, descriptions}
  },
  data() {
    return {
      active: false,
      activeRight: false,
      activeBottom: false,
      activeTop: false,
    };
  },
};
</script>

<style scoped></style>
