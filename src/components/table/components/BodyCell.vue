<template>
  <td :data-colname="column.label" :class="bodyCellClass">
    <slot>{{ item[column.key] }}</slot>

    <template v-if="isPrimary">
      <div v-if="actions.length" class="row-actions">
        <slot name="row-actions" :row="item">
          <span v-for="action in actions" :key="action.key" :class="action.key">
            <a href="#" @click.prevent="actionClicked(action.key, item)">{{
                action.label
              }}</a>
          </span>
        </slot>
      </div>

      <button
        v-if="isMobile"
        class="data-table-toggle-button"
        aria-label="Show more details"
        @click="toggleRow($event)"
      >
        <DataTableIcon icon="expand-less" class="triangle-up" />
        <DataTableIcon icon="expand-more" class="triangle-down" />
      </button>
    </template>
  </td>
</template>

<script lang="ts" setup>
import DataTableIcon from "./DataTableIcon.vue";
import { computed, PropType } from "vue";
import { ItemInterface, TableActionDataInterface, TableColumnDataInterface } from "../TableInterfaces";

const props = defineProps({
  item: { type: Object as PropType<ItemInterface>, required: true },
  column: {
    type: Object as PropType<TableColumnDataInterface>,
    required: true
  },
  actions: {
    type: Array as PropType<TableActionDataInterface[]>,
    default: () => []
  },
  isPrimary: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false }
});
const emit = defineEmits<{
  "click:toggle": [event: Event];
  "click:action": [key: string, item: ItemInterface]
}>();
const toggleRow = (event: Event) => emit("click:toggle", event);
const actionClicked = (key: string, item: ItemInterface) =>
  emit("click:action", key, item);
const isNumeric = computed(
  () => typeof props.column.numeric !== "undefined" && props.column.numeric
);

const bodyCellClass = computed(() => {
  return [
    "shapla-data-table__cell",
    "shapla-data-table__cell-" + props.column.key,
    { "is-numeric-cell": isNumeric.value },
    { "column-primary": props.isPrimary }
  ];
});
</script>
