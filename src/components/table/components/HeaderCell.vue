<template>
  <th :class="getHeadCellClass" role="columnheader" scope="col">
    <slot>
      <template v-if="!isSortable">
        {{ column.label }}
      </template>
      <template v-else>
        <a href="#" @click.prevent="handleSort">
          <DataTableIcon v-if="isSortedDesc" icon="arrow-upward" />
          <DataTableIcon v-if="isSortedAsc" icon="arrow-downward" />
          <span>{{ column.label }}</span>
        </a>
      </template>
    </slot>
  </th>
</template>

<script lang="ts" setup>
import DataTableIcon from "./DataTableIcon.vue";
import { computed, defineEmits, defineProps, PropType } from "vue";
import { TableColumnDataInterface } from "../TableInterfaces";

const props = defineProps({
  column: {
    type: Object as PropType<TableColumnDataInterface>,
    required: false,
    default: () => ({ key: "", label: "" }),
  },
  isPrimary: { type: Boolean, default: false },
  isCheckbox: { type: Boolean, default: false },
  isExpandToggle: { type: Boolean, default: false },
  sortBy: { type: String, default: "id" },
  sortOrder: { type: String, default: "desc" },
});
const emit = defineEmits(["sort"]);
const handleSort = () => emit("sort", props.column.key);

const isNumeric = computed(
  () =>
    typeof props.column.numeric !== "undefined" && props.column.numeric === true
);
const isSortable = computed(
  () =>
    typeof props.column.sortable !== "undefined" &&
    props.column.sortable === true
);
const isSorted = computed(() => props.column.key === props.sortBy);
const isSortedAsc = computed(() => props.sortOrder === "asc");
const isSortedDesc = computed(() => props.sortOrder === "desc");

const getHeadCellClass = computed(() => {
  const classes = ["shapla-data-table__header-cell"];
  if (props.column && props.column.key)
    classes.push(`shapla-data-table__header-cell-${props.column.key}`);
  if (props.isPrimary) classes.push("column-primary");
  if (props.isCheckbox) classes.push("is-checkbox-cell");
  if (props.isExpandToggle) classes.push("is-expand-toggle-cell");
  if (isNumeric.value) classes.push("is-numeric-cell");
  if (isSortable.value) {
    classes.push("is-sortable");
    if (isSorted.value) classes.push("is-sorted");
    if (isSortedAsc.value) classes.push("is-sorted-ascending");
    if (isSortedDesc.value) classes.push("is-sorted-descending");
  }
  return classes;
});
</script>
