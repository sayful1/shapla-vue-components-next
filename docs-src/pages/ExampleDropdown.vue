<template>
  <doc-tab
    heading="Dropdown"
    subheading="A simple and interactive dropdown menu for discoverable content for Vue 3"
    slug="shapla-dropdown"
    name="ShaplaDropdown"
    scss-mixin="dropdown"
    :properties="properties"
    :desc="descriptions"
  >
    <code-block>
      <div class="test-dropdown-container">
        <dropdown :hoverable="false">
          <template #trigger>
            <button>From Left: Click</button>
          </template>
          <a
            href="https://example.com"
            class="shapla-dropdown-item is-link is-active"
          >Link 1</a>
          <a href="https://example.com" class="shapla-dropdown-item is-link">Link 2</a>
          <span class="dropdown-divider" />
          <a href="https://example.com" class="shapla-dropdown-item is-link">Link 3</a>
          <a href="https://example.com" class="shapla-dropdown-item is-link">Link 4</a>
        </dropdown>
        <dropdown :hoverable="true" :right="true">
          <template #trigger>
            <button>From Right: Hover</button>
          </template>
          <a
            href="https://example.com"
            class="shapla-dropdown-item is-link is-active"
          >Link 1</a>
          <a href="https://example.com" class="shapla-dropdown-item is-link">Link 2</a>
          <span class="dropdown-divider" />
          <a href="https://example.com" class="shapla-dropdown-item is-link">Link 3</a>
          <a href="https://example.com" class="shapla-dropdown-item is-link">Link 4</a>
        </dropdown>
        <div class="mt-16">
          <dropdown :hoverable="false" :right="false" :up="true">
            <template #trigger>
              <button>From Bottom to top: Click</button>
            </template>
            <a
              href="https://example.com"
              class="shapla-dropdown-item is-link is-active"
            >Link 1</a>
            <a href="https://example.com" class="shapla-dropdown-item is-link">Link 2</a>
            <span class="dropdown-divider" />
            <a href="https://example.com" class="shapla-dropdown-item is-link">Link 3</a>
            <a href="https://example.com" class="shapla-dropdown-item is-link">Link 4</a>
          </dropdown>
        </div>
        <div class="mt-16">---</div>
        <div class="mt-16">
          <dropdown :hoverable="false" :right="false">
            <template #trigger>
              <button>Auto direction: Click</button>
            </template>
            <a
              href="https://example.com"
              class="shapla-dropdown-item is-link is-active"
            >Link 1</a>
            <a href="https://example.com" class="shapla-dropdown-item is-link">Link 2</a>
            <span class="dropdown-divider" />
            <a href="https://example.com" class="shapla-dropdown-item is-link">Link 3</a>
            <a href="https://example.com" class="shapla-dropdown-item is-link">Link 4</a>
          </dropdown>
        </div>
        <div class="mt-16">
          <dropdown :hoverable="false" :right="false" :max-items="5">
            <template #trigger>
              <button>Auto direction: Click</button>
            </template>
            <template #before-content> before content</template>
            <template #after-content> after content</template>
            <a
              v-for="item in range(2)"
              :key="item + 10"
              href="https://example.com"
              class="shapla-dropdown-item is-link"
            >Link {{ item + 1 }}</a>
            <span class="shapla-dropdown-divider" />
            <a
              v-for="item in range(8)"
              :key="item"
              href="https://example.com"
              class="shapla-dropdown-item is-link"
            >Link {{ item + 3 }}</a>
          </dropdown>
        </div>
      </div>
    </code-block>
  </doc-tab>
</template>

<script>
import {computed} from "vue";
import {ShaplaDropdown} from "../../src";
import DocTab from "../components/DocTab.vue";
import CodeBlock from "../components/CodeBlock.vue";

export default {
  name: "ExampleDropdown",
  components: {CodeBlock, DocTab, dropdown: ShaplaDropdown},
  setup() {
    const properties = computed(() => ShaplaDropdown.props);
    const descriptions = {}
    return {properties, descriptions}
  },
  methods: {
    range(length = 20) {
      return Array.from({length: length}, (x, i) => i);
    },
  }
};
</script>
