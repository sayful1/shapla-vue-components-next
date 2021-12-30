<template>
  <div class="shapla-tabs__panel" :class="{'is-active':isActive}">
    <slot :active="isActive" />
  </div>
</template>

<script lang="ts">
import {onBeforeMount, onMounted, watch, inject, defineComponent, reactive, toRefs} from "vue";

interface TabsDataInterface {
  tabs: [],
  selectedIndex: number,
  count: number,
}

export default defineComponent({
  name: "ShaplaTab",
  props: {
    name: {type: String, required: true},
    selected: {type: Boolean, required: false, default: false},
    navItemClass: {type: String, required: false, default: ""},
  },
  setup(props) {
    const state = reactive<{ isActive: boolean, index: number, }>({
      isActive: false,
      index: -1,
    });
    const tabs = inject<TabsDataInterface>("ShaplaTabsProvider");

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

    return {...toRefs(state)};
  },
})
</script>
