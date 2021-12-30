<template>
  <section class="section section-properties">
    <h2 class="title">
      {{ heading }}
    </h2>

    <shapla-table :show-cb="false" :columns="columns" :items="tableRows" />
  </section>
</template>

<script>
import {ShaplaTable} from "../../src/index.ts";

export default {
  name: "SectionProps",
  components: {ShaplaTable},
  props: {
    heading: {type: String, default: "Properties"},
    properties: {
      type: Object,
      default: () => {
        return {};
      },
    },
    desc: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      tableRows: [],
      columns: [
        {key: "property", label: "Property"},
        {key: "type", label: "Type"},
        {key: "required", label: "Required"},
        {key: "default", label: "Default"},
        {key: "description", label: "Description"},
      ],
    };
  },
  mounted() {
    let descriptions = this.desc
    if (!Object.keys(descriptions).length) {
      descriptions = Object.keys(this.properties).reduce((previousValue, currentValue) =>
          ({...previousValue, [currentValue]: ''}), {});
    }

    for (const [key, value] of Object.entries(this.properties)) {
      if (Object.keys(descriptions).indexOf(key) === -1) {
        continue;
      }
      this.tableRows.push({
        property: key,
        default: value["default"] ?? "undefined",
        type: value["type"]["name"] ?? "Any",
        required: value["required"] ?? false ? "yes" : "no",
        description: descriptions[key] ?? "",
      });
    }
  },
};
</script>
