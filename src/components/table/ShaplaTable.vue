<template>
  <div :class="tableClasses">
    <table class="shapla-data-table" :aria-label="areaLabel">
      <table-header>
        <header-cell v-if="showCb" :is-checkbox="true">
          <shapla-checkbox
              id="cb-select-all-1"
              :checked="isAllSelected"
              @update:modelValue="selectAllItems"
          />
        </header-cell>
        <header-cell
            v-for="column in columns"
            :key="column.key"
            :column="column"
            :sort-by="sortBy"
            :sort-order="sortOrder"
            :is-primary="actionColumn === column.key"
            @sort="sortClicked"
        />
        <header-cell v-if="showExpand" :is-expand-toggle="true"/>
      </table-header>

      <table-body>
        <template v-if="items.length">
          <template v-for="row in items" :key="row[index]">
            <body-row :class="{ 'is-selected': selectedItems.includes(row[index]) }">
              <td
                  v-if="showCb"
                  class="shapla-data-table__cell is-checkbox-cell"
              >
                <shapla-checkbox
                    :value="row[index]"
                    :checked="selectedItems.includes(row[index])"
                    @update:modelValue="selectItem(row)"
                />
              </td>

              <body-cell
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
              </body-cell>

              <body-cell-expand
                  v-if="showExpand"
                  @click:expand="toggleExpandRow"
              />
            </body-row>
            <body-row-expand
                v-if="showExpand"
                :key="`${row[index]}-expand`"
                :colspan="colspan"
            >
              <slot name="cellExpand" :row="row"/>
            </body-row-expand>
          </template>
        </template>

        <body-row-no-item v-if="!items.length" :colspan="colspan">
          {{ notFoundText }}
        </body-row-no-item>
      </table-body>
    </table>
  </div>
</template>

<script lang="ts">
import {computed, ref, onMounted, defineComponent, PropType} from "vue";
import {TableActionDataInterface, TableColumnDataInterface, ItemInterface} from "./TableInterfaces";
import ShaplaCheckbox from "../checkbox/ShaplaCheckbox.vue";
import HeaderCell from "./components/HeaderCell.vue";
import BodyCell from "./components/BodyCell.vue";
import BodyCellExpand from "./components/BodyCellExpand.vue";
import BodyRowExpand from "./components/BodyRowExpand.vue";
import BodyRowNoItem from "./components/BodyRowNoItem.vue";
import TableHeader from "./components/TableHeader.vue";
import TableBody from "./components/TableBody.vue";
import BodyRow from "./components/BodyRow.vue";

export default defineComponent({
  name: "ShaplaTable",
  components: {
    BodyRow,
    TableBody,
    TableHeader,
    BodyRowNoItem,
    BodyRowExpand,
    BodyCellExpand,
    BodyCell,
    HeaderCell,
    ShaplaCheckbox,
  },
  props: {
    items: {type: Array as PropType<ItemInterface[]>, required: true},
    columns: {type: Array as PropType<TableColumnDataInterface[]>, required: true},
    selectedItems: {type: Array as PropType<number[]>, default: () => []},
    actions: {type: Array as PropType<TableActionDataInterface[]>, default: () => []},
    index: {type: String, default: "id"},
    showCb: {type: Boolean, default: true},
    selectAllText: {type: String, default: "Select All"},
    notFoundText: {type: String, default: "No items found."},
    sortBy: {type: String, default: "id"},
    sortOrder: {type: String, default: "desc"},
    mobileWidth: {type: Number, default: 768},
    areaLabel: {type: String, default: null, required: false},
    showExpand: {type: Boolean, default: false},
  },
  emits: ["click:action", "click:sort", "select:item"],
  setup(props, {emit}) {
    const windowWidth = ref(0);
    const isMobileView = computed(() => windowWidth.value <= props.mobileWidth);
    const updateTableWidth = () => (windowWidth.value = window.innerWidth);

    const emitItemsSelect = (items: number[]) => emit("select:item", items);
    const actionClicked = (action: string, row: ItemInterface) => emit("click:action", action, row);
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
            !!(
                props.items.length &&
                props.selectedItems.length === props.items.length
            )
    );
    const hasActions = computed(() => props.actions.length > 0);

    onMounted(() => {
      updateTableWidth();
      window.addEventListener("resize", () => updateTableWidth());
      window.addEventListener("orientationchange", () => updateTableWidth());
    });

    const selectItem = (item: ItemInterface) => {
      let value = item[props.index] !== undefined ? item[props.index] : item.id,
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
      let selected: number[] = [];

      if (
          props.items.length &&
          props.selectedItems.length !== props.items.length
      ) {
        props.items.forEach((item) => selected.push(item[props.index] as number));
      }
      emitItemsSelect(selected);
    };

    const toggleRow = (event: Event) => {
      let el = event.target as HTMLElement,
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
      let el = event.target as HTMLElement,
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

    return {
      tableClasses,
      actionColumn,
      colspan,
      isAllSelected,
      hasActions,
      isMobileView,
      selectItem,
      selectAllItems,
      actionClicked,
      sortClicked,
      toggleRow,
      toggleExpandRow,
    };
  },
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.data-table;
</style>
