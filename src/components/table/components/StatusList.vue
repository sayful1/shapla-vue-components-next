<template>
  <ul class="shapla-status-list" :class="`shapla-status-list--${type}`">
    <li
        v-for="status in statuses"
        :key="status.key"
        class="shapla-status-list__item"
        :class="{ 'is-active': status.active }"
    >
      <a
          href="#"
          class="shapla-status-list__item-link"
          @click.prevent="handleClickEvent(status)"
      >
        <span class="shapla-status-list__item-label">{{ status.label }}</span>
        <span class="shapla-status-list__item-count">{{ status.count }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

interface StatusInterface {
  key: string,
  label: string,
  count: number,
  active: boolean
}

export default defineComponent({
  name: "StatusList",
  props: {
    statuses: {type: Array as PropType<StatusInterface[]>, default: () => []},
    type: {
      type: String, default: "horizontal", validator: (value: string) =>
          -1 !== ["vertical", "horizontal"].indexOf(value),
    },
  },
  emits: ["change"],
  setup(props, {emit}) {
    const handleClickEvent = (event: Event) => emit("change", event);
    return {handleClickEvent};
  },
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.data-table-status-list;
</style>
