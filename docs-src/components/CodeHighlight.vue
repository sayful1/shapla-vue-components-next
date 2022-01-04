<template>
  <div class="shapla-code-highlight">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.shapla-code-highlight {
  background: #f5f5f5;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #f1f1f1;
  font-size: 18px;
  line-height: 1.8;
}
</style>

<script>
import hljs from "highlight.js";

export default {
  name: "CodeHighlight",
  mounted() {
    this.$el.querySelectorAll("pre code").forEach((element) => {
      hljs.highlightBlock(element);
    });
  },
};
</script>
