<template>
  <section-hero :heading="heading">
    <p v-html="subheading" />
  </section-hero>

  <shapla-tabs alignment="center" size="large" fullwidth>
    <shapla-tab name="Implementation" selected>
      <section-usage
        :slug="slug" :name="name" :slug2="slug2"
        :name2="name2"
        :scss-mixin="scssMixin"
      />
      <section-props :heading="propsHeading" :properties="properties" :desc="desc" />
      <slot name="after-props" />
    </shapla-tab>
    <shapla-tab name="Demo and Example Code">
      <slot />
    </shapla-tab>
  </shapla-tabs>
</template>

<script>
import SectionHero from "./SectionHero.vue";
import SectionProps from "./SectionProps.vue";
import SectionUsage from "./SectionUsage.vue";
import {ShaplaTabs, ShaplaTab} from "../../src/index.ts";

export default {
  name: "DocTab",
  components: {ShaplaTabs, ShaplaTab, SectionHero, SectionProps, SectionUsage},
  props: {
    heading: {type: String, default: ""},
    subheading: {type: String, default: ""},
    slug: {type: String, default: ""},
    name: {type: String, default: ""},
    slug2: { type: String, default: "" },
    name2: { type: String, default: "" },
    scssMixin: {type: String, default: ""},
    propsHeading: {type: String, default: "Properties"},
    properties: {
      type: Object, default: () => {
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
};
</script>
