<template>
  <div :class="tabsClasses">
    <div :class="tabClasses">
      <ul class="shapla-tabs__nav">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="shapla-tabs__nav-item"
          :class="navItemClass(tab, index)"
        >
          <a
            :href="tab.props.navTo"
            @click="selectTab(tab, index, $event)"
            v-html="tab.props.name"
          />
        </li>
      </ul>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import {
  provide,
  reactive,
  toRefs,
  onBeforeMount,
  computed,
  defineComponent,
  VNode,
} from "vue";
import { TabsDataInterface, TabVNodeTypeInterface } from "./interfaces";

export default defineComponent({
  name: "ShaplaTabs",
  props: {
    alignment: {
      type: String,
      default: "left",
      validator: (value: string) =>
        ["left", "center", "right"].indexOf(value) !== -1,
    },
    size: {
      type: String,
      default: "default",
      validator: (value: string) =>
        ["default", "small", "medium", "large"].indexOf(value) !== -1,
    },
    tabStyle: {
      type: String,
      default: "default",
      validator: (value: string) =>
        ["default", "boxed", "rounded", "toggle"].indexOf(value) !== -1,
    },
    fullwidth: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
  },
  emits: ["change:tab"],
  setup(props, { emit, slots }) {
    const state = reactive<TabsDataInterface>({
      tabs: [],
      selectedIndex: 0,
      count: 0,
    });

    provide("ShaplaTabsProvider", state);

    const selectTab = (tab: VNode, index: number, event: Event) => {
      if (!tab.props?.navTo) {
        event.preventDefault();
      }
      state.selectedIndex = index;
      emit("change:tab", tab, index);
    };

    const navItemClass = (tab: VNode, index: number) => {
      const classes = [];
      if (index === state.selectedIndex) {
        classes.push("is-active");
      }
      if (tab.props?.navItemClass) {
        classes.push(tab.props.navItemClass);
      }
      return classes;
    };

    const tabsClasses = computed(() => {
      const classes = ["shapla-tabs"];
      if (props.vertical) classes.push("shapla-tabs--vertical");
      return classes;
    });

    const tabClasses = computed(() => {
      const classes = ["shapla-tabs__tab", `is-${props.size}`];
      if (props.fullwidth) classes.push("is-fullwidth");
      if (props.alignment === "center") classes.push("is-centered");
      if (props.alignment === "right") classes.push("is-right");
      if (props.tabStyle === "boxed") classes.push("is-boxed");
      if (props.tabStyle === "toggle" || props.tabStyle === "rounded")
        classes.push("is-toggle");
      if (props.tabStyle === "rounded") classes.push("is-toggle-rounded");
      return classes;
    });

    onBeforeMount(() => {
      if (slots.default) {
        state.tabs = slots.default().filter((child) => {
          return (child.type as TabVNodeTypeInterface).name === "ShaplaTab";
        });
      }
    });

    return {
      ...toRefs(state),
      selectTab,
      navItemClass,
      tabsClasses,
      tabClasses,
    };
  },
});
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.tabs;
</style>
