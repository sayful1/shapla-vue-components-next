<template>
  <h4 class="is-h4">{{ heading }}</h4>
  <shapla-columns>
    <shapla-column :tablet="6">
      <slot />
    </shapla-column>
    <shapla-column :tablet="6">
      <code-highlight>
        <slot name="code" />
      </code-highlight>
    </shapla-column>
  </shapla-columns>
</template>

<script>
import CodeHighlight from "./CodeHighlight.vue";
import {ShaplaColumns, ShaplaColumn} from "../../src/index.ts";

export default {
  name: "CodeBlock",
  components: {ShaplaColumn, ShaplaColumns,CodeHighlight},
  props:{
    heading:{type:String,default:''}
  }
}
</script>

<style scoped>

</style>