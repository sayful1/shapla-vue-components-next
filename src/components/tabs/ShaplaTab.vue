<template>
  <div class="shapla-tabs__panel" :class="{ 'is-active': state.isActive }">
    <slot :active="state.isActive" />
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  inject,
  onBeforeMount,
  onMounted,
  reactive,
  watch,
} from "vue";
import { TabsDataInterface } from "./interfaces";

const props = defineProps({
  name: { type: String, required: true },
  selected: { type: Boolean, required: false, default: false },
  navItemClass: { type: String, required: false, default: "" },
  navTo: { type: String, required: false, default: "" },
});
const state = reactive<{ isActive: boolean; index: number }>({
  isActive: false,
  index: -1,
});
const tabs = inject("ShaplaTabsProvider") as TabsDataInterface;

watch(
  () => tabs.selectedIndex,
  () => {
    state.isActive = state.index === tabs.selectedIndex;
  }
);

onBeforeMount(() => {
  state.index = tabs.count;
  tabs.count++;
  state.isActive = state.index === tabs.selectedIndex;
});

onMounted(() => {
  state.isActive = props.selected;
  if (props.selected) {
    tabs.selectedIndex = state.index;
  }
});
</script>
