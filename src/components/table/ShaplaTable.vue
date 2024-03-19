<template>
  <div :class="tableClasses">
    <table class="shapla-data-table" :aria-label="areaLabel">
      <TableHeader>
        <HeaderCell v-if="showCb" :is-checkbox="true">
          <ShaplaCheckbox
            id="cb-select-all-1"
            :checked="isAllSelected"
            @update:modelValue="selectAllItems"
          />
        </HeaderCell>
        <HeaderCell
          v-for="column in columns"
          :key="column.key"
          :column="column"
          :sort-by="sortBy"
          :sort-order="sortOrder"
          :is-primary="actionColumn === column.key"
          @sort="sortClicked"
        />
        <HeaderCell v-if="showExpand" :is-expand-toggle="true" />
      </TableHeader>

      <TableBody>
        <template v-if="items.length">
          <template v-for="row in items" :key="row[index]">
            <BodyRow
              :class="{ 'is-selected': selectedItems.includes(row[index]) }"
              @click="rowClicked(row)"
            >
              <td
                v-if="showCb"
                class="shapla-data-table__cell is-checkbox-cell"
              >
                <ShaplaCheckbox
                  :value="row[index]"
                  :checked="selectedItems.includes(row[index])"
                  @update:modelValue="selectItem(row)"
                />
              </td>

              <BodyCell
                v-for="column in columns"
                :key="column.key"
                :column="column"
                :item="row"
                :actions="actions"
                :is-primary="actionColumn === column.key"
                :is-mobile="isMobileView"
                @click:action="actionClicked"
                @click:toggle="toggleRow"
              >
                <slot :name="column.key" :row="row">
                  {{ row[column.key] }}
                </slot>
              </BodyCell>

              <BodyCellExpand
                v-if="showExpand"
                @click:expand="toggleExpandRow"
              />
            </BodyRow>
            <BodyRowExpand
              v-if="showExpand"
              :key="`${row[index]}-expand`"
              :colspan="colspan"
            >
              <slot name="cellExpand" :row="row" />
            </BodyRowExpand>
          </template>
        </template>

        <BodyRowNoItem v-if="!items.length" :colspan="colspan">
          {{ notFoundText }}
        </BodyRowNoItem>
      </TableBody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  onMounted,
  PropType,
  ref,
} from "vue";
import {
  ItemInterface,
  TableActionDataInterface,
  TableColumnDataInterface,
} from "./TableInterfaces";
import ShaplaCheckbox from "../checkbox/ShaplaCheckbox.vue";
import HeaderCell from "./components/HeaderCell.vue";
import BodyCell from "./components/BodyCell.vue";
import BodyCellExpand from "./components/BodyCellExpand.vue";
import BodyRowExpand from "./components/BodyRowExpand.vue";
import BodyRowNoItem from "./components/BodyRowNoItem.vue";
import TableHeader from "./components/TableHeader.vue";
import TableBody from "./components/TableBody.vue";
import BodyRow from "./components/BodyRow.vue";

const props = defineProps({
  items: { type: Array, required: true },
  columns: {
    type: Array as PropType<TableColumnDataInterface[]>,
    required: true,
  },
  selectedItems: { type: Array as PropType<number[]>, default: () => [] },
  actions: {
    type: Array as PropType<TableActionDataInterface[]>,
    default: () => [],
  },
  index: { type: String, default: "id" },
  showCb: { type: Boolean, default: true },
  selectAllText: { type: String, default: "Select All" },
  notFoundText: { type: String, default: "No items found." },
  sortBy: { type: String, default: "id" },
  sortOrder: { type: String, default: "desc" },
  mobileWidth: { type: Number, default: 768 },
  areaLabel: { type: String, default: null, required: false },
  showExpand: { type: Boolean, default: false },
});
const emit = defineEmits([
  "click:action",
  "click:sort",
  "select:item",
  "click:row",
]);
const windowWidth = ref(0);
const isMobileView = computed(() => windowWidth.value <= props.mobileWidth);
const updateTableWidth = () => (windowWidth.value = window.innerWidth);

const emitItemsSelect = (items: number[]) => emit("select:item", items);
const actionClicked = (action: string, row: ItemInterface) =>
  emit("click:action", action, row);
const rowClicked = (row: ItemInterface) => emit("click:row", row);
const sortClicked = (column: string) =>
  emit("click:sort", column, props.sortOrder === "asc" ? "desc" : "asc");

const tableClasses = computed(() => {
  return {
    "shapla-data-table-container": true,
    "shapla-data-table--mobile": isMobileView.value,
  };
});

// Find primary/action column
const actionColumn = computed(() => {
  let column = "title";
  props.columns.forEach((col, index) => {
    if (index === 0) column = col.key;
  });
  return column;
});

// Count colspan for empty table
const colspan = computed(() => {
  let columns = Object.keys(props.columns).length;
  if (props.showCb) columns += 1;
  if (props.showExpand) columns += 1;

  return columns;
});

// Check if all items selected
const isAllSelected = computed(
  () =>
    !!(props.items.length && props.selectedItems.length === props.items.length)
);

onMounted(() => {
  updateTableWidth();
  window.addEventListener("resize", () => updateTableWidth());
  window.addEventListener("orientationchange", () => updateTableWidth());
});

const selectItem = (item: ItemInterface) => {
  const value = item[props.index] !== undefined ? item[props.index] : item.id,
    selectedItems = props.selectedItems,
    index = selectedItems.indexOf(value as number);
  if (-1 === index) {
    selectedItems.push(value as number);
  } else {
    selectedItems.splice(index, 1);
  }

  emitItemsSelect(selectedItems);
};

const selectAllItems = () => {
  const selected: number[] = [];

  if (props.items.length && props.selectedItems.length !== props.items.length) {
    props.items.forEach((item) => selected.push(item[props.index] as number));
  }
  emitItemsSelect(selected);
};

const toggleRow = (event: Event) => {
  const el = event.target as HTMLElement,
    tr = el.closest("tr"),
    table = el.closest("table");
  table?.querySelectorAll("tr").forEach((element: HTMLTableRowElement) => {
    if (element.classList.contains("is-expanded") && element !== tr) {
      element.classList.remove("is-expanded");
    }
  });

  setTimeout(() => tr?.classList.toggle("is-expanded"), 50);
};

const toggleExpandRow = (event: Event) => {
  const el = event.target as HTMLElement,
    tr = el.closest("tr"),
    nextTr = tr?.nextElementSibling as HTMLElement,
    up = tr?.querySelector(".expand-triangle-up") as HTMLElement,
    down = tr?.querySelector(".expand-triangle-down") as HTMLElement;

  if ("none" === nextTr?.style.display) {
    nextTr.style.display = "";
    up.style.display = "block";
    down.style.display = "none";
  } else {
    up.style.display = "none";
    nextTr.style.display = "none";
    down.style.display = "block";
  }
};
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.data-table;
</style>
