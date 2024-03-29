<template>
  <doc-tab
    heading="Data Table"
    slug="shapla-table"
    name="ShaplaTable"
    scss-mixin="data-table"
    :properties="properties"
    :desc="descriptions"
  >
    <div>
      <h2>Demo Table One</h2>
      <data-table
        :items="items"
        :columns="columns"
        :sort-by="sortBy"
        :sort-order="sortOrder"
        :selected-items="selectedItems"
        :actions="actions"
        @click:sort="sortData"
        @click:action="onActionClick"
        @select:item="selectItems"
        @click:row="onRowClick"
      />

      <h2>Demo Table Two (No items)</h2>
      <data-table
        :items="[]"
        :columns="columns"
        :sort-by="sortBy"
        :sort-order="sortOrder"
        :selected-items="selectedItems"
        :actions="actions"
        @click:sort="sortData"
        @click:action="onActionClick"
        @select:item="selectItems"
      />

      <h2>Demo Table One</h2>
      <div style="margin-bottom: 1rem; display: flex">
        <status-list :statuses="statuses" @change="changeStatus" />
      </div>
      <data-table
        :show-expand="true"
        :items="items"
        :columns="columns"
        :sort-by="sortBy"
        :sort-order="sortOrder"
        :selected-items="selectedItems"
        :actions="actions"
        @click:sort="sortData"
        @click:action="onActionClick"
        @select:item="selectItems"
      >
        <template #cellExpand="data">
          {{ data.row }}
        </template>
      </data-table>

      <div style="margin-top: 1rem">
        <pagination
          :total-items="pagination.totalItems"
          :current-page="pagination.currentPage"
          :per-page="pagination.perPage"
          @paginate="paginate"
        />
      </div>
    </div>
  </doc-tab>
</template>

<script>
import {
  ShaplaTable,
  ShaplaTablePagination as Pagination,
  ShaplaTableStatusList as StatusList,
} from "../../src";
import DocTab from "../components/DocTab.vue";
import { computed } from "vue";

export default {
  name: "ExampleTable",
  components: { DocTab, "data-table": ShaplaTable, Pagination, StatusList },
  setup() {
    const properties = computed(() => ShaplaTable.props);
    const descriptions = {};
    return { properties, descriptions };
  },
  data() {
    return {
      statuses: [
        { key: "all", label: "All", count: 11, active: true },
        { key: "active", label: "Active", count: 9, active: false },
        { key: "trash", label: "Trash", count: 2, active: false },
      ],
      columns: [
        { key: "title", label: "Title", numeric: false },
        { key: "bangle", label: "Bangle", numeric: true },
        { key: "english", label: "English", numeric: true },
        { key: "math", label: "Math", numeric: true, sortable: true },
      ],
      items: [
        { id: 1, title: "Sayful Islam", bangle: 70, english: 80, math: 100 },
        { id: 2, title: "Akhi", bangle: 70, english: 80, math: 90 },
        { id: 3, title: "Saif Al Araf", bangle: 70, english: 80, math: 80 },
      ],
      actions: [
        { key: "edit", label: "Edit" },
        { key: "trash", label: "Delete" },
      ],
      bulkActions: [{ key: "trash", label: "Move to Trash" }],
      sortBy: "math",
      sortOrder: "asc",
      selectedItems: [],
      pagination: {
        totalItems: 100,
        currentPage: 1,
        perPage: 20,
      },
    };
  },
  methods: {
    paginate(page) {
      this.pagination.currentPage = page;
    },
    changeStatus(status) {
      this.statuses.filter((item) => {
        item.active = item.key === status.key;
      });
    },
    selectItems(selectedItems) {
      this.selectedItems = selectedItems;
    },
    sortData: function sortData(column, order) {
      this.sortBy = column;
      this.sortOrder = order;
      if ("asc" === order) {
        this.items.sort(function (a, b) {
          return a[column] - b[column];
        });
      } else {
        this.items.sort(function (a, b) {
          return b[column] - a[column];
        });
      }
    },
    onActionClick: function onActionClick(action, row) {
      if ("trash" === action) {
        if (confirm("Are you sure to delete?")) {
          alert("deleted: " + row.title);
        }
      }
    },
    onRowClick(row) {
      window.console.log("Row clicked: ", row);
    },
  },
};
</script>
