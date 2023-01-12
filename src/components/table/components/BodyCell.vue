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
        <data-table-icon icon="expand-less" class="triangle-up" />
        <data-table-icon icon="expand-more" class="triangle-down" />
      </button>
    </template>
  </td>
</template>

<script lang="ts">
import DataTableIcon from "./DataTableIcon.vue";
import { computed, defineComponent, PropType } from "vue";
import {
  TableActionDataInterface,
  TableColumnDataInterface,
  ItemInterface,
} from "../TableInterfaces";

export default defineComponent({
  name: "BodyCell",
  components: { DataTableIcon },
  props: {
    item: { type: Object, required: true },
    column: {
      type: Object as PropType<TableColumnDataInterface>,
      required: true,
    },
    actions: {
      type: Array as PropType<TableActionDataInterface[]>,
      default: () => [],
    },
    isPrimary: { type: Boolean, default: false },
    isMobile: { type: Boolean, default: false },
  },
  emits: ["click:toggle", "click:action"],
  setup(props, { emit }) {
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
        { "column-primary": props.isPrimary },
      ];
    });

    return {
      actionClicked,
      toggleRow,
      bodyCellClass,
    };
  },
});
</script>
