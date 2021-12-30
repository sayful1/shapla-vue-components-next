<template>
  <thead>
    <tr class="shapla-data-table__header-row">
      <slot />
    </tr>
  </thead>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "TableHeader",
})
</script>
