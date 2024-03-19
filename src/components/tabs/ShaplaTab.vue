<template>
  <div :id="panelId" class="shapla-tabs__panel" :class="{ 'is-active': state.isActive }">
    <div ref="titleEl" class="shapla-tabs__panel-title" style="display: none">
      <slot name="name" />
    </div>
    <slot :active="state.isActive" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, inject, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { TabsDataInterface } from "./interfaces";

const props = defineProps({
  name: { type: String, required: true },
  selected: { type: Boolean, required: false, default: false },
  navItemClass: { type: String, required: false, default: "" },
  navTo: { type: String, required: false, default: "" }
});
const state = reactive<{ isActive: boolean; index: number }>({
  isActive: false,
  index: -1
});
const tabs = inject<TabsDataInterface>("ShaplaTabsProvider");
const titleEl = ref<HTMLDivElement>(null);
const panelId = computed(() => props.name.toLowerCase().replace(/ /g, "-"));
const title = computed(() => {
  if (titleEl.value) {
    return titleEl.value.innerHTML || props.name;
  }
  return props.name;
});

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
