<template>
  <doc-tab
    heading="Star Rating"
    slug="shapla-star-rating"
    name="ShaplaStarRating"
    scss-mixin="star-rating"
    :properties="properties"
    :desc="descriptions"
  >
    <div>
      <div class="shapla-columns">
        <div class="shapla-column">
          <span>Input</span>
          <star-rating v-model="rating" />
          <pre>{{ rating }}</pre>
        </div>
        <div class="shapla-column">
          <span>Static</span>
          <star-rating v-model="staticRating" :is-static="true" />
          <pre>{{ staticRating }}</pre>
        </div>
        <div class="shapla-column">
          <span>Static 2</span>
          <star-rating v-model="staticRating2" :is-static="true" />
          <pre>{{ staticRating2 }}</pre>
        </div>
        <div class="shapla-column">
          <span>Static 3</span>
          <star-rating v-model="staticRating3" :is-static="true" />
          <pre>{{ staticRating3 }}</pre>
        </div>
      </div>
    </div>
  </doc-tab>
</template>

<script>
import { ShaplaStarRating } from "../../src";
import DocTab from "../components/DocTab.vue";
import { computed } from "vue";

export default {
  name: "ExampleStarRating",
  components: { DocTab, "star-rating": ShaplaStarRating },
  setup() {
    const properties = computed(() => ShaplaStarRating.props);
    const descriptions = {};
    return { properties, descriptions };
  },
  data() {
    return {
      rating: 3,
      staticRating: 3.2,
      staticRating2: 3.5,
      staticRating3: 3.7,
    };
  },
};
</script>
