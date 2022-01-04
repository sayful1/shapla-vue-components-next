<template>
  <doc-tab
    heading="Toggles"
    slug="shapla-toggles"
    name="ShaplaToggles"
    slug2="shapla-toggle"
    name2="ShaplaToggle"
    scss-mixin="toggles"
    props-heading="Props for `ShaplaToggles`"
    :properties="properties"
    :desc="descriptions"
  >
    <template #after-props>
      <section-props heading="Props for `ShaplaToggle`" :properties="properties2" :desc="descriptions2" />
    </template>
    <div class="test-toggle-container">
      <toggles
        :accordion="true"
        icon-position="left"
        :boxed-mode="false"
        :show-divider="true"
        title-color="primary"
      >
        <toggle name="Nested Toggle">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, quasi.
          <toggles>
            <toggle name="Nested 2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolorem
              laborum molestiae neque nisi nostrum perferendis placeat quod
              reprehenderit sunt.
            </toggle>
          </toggles>
        </toggle>
        <toggle
          v-for="_range in range"
          :key="_range"
          :name="`Toggle ${_range + 1}`"
          :selected="_range === 1"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam at
          et itaque magnam nulla officiis perferendis ratione velit, veritatis.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aspernatur
          assumenda at autem beatae consectetur consequatur culpa debitis dolorem
          doloremque eligendi eum ex expedita fugiat inventore iste iusto laborum
          laudantium natus officiis, pariatur placeat porro quam quisquam,
          repudiandae sit suscipit ut. Aliquid beatae culpa doloribus dolorum ea
          earum et exercitationem, hic, incidunt ipsum laborum minus
          necessitatibus officia quasi rerum sapiente tenetur unde. Accusamus
          adipisci aliquid animi asperiores et, impedit laborum maiores, molestias
          natus nisi quae quo repudiandae velit! Dignissimos ex impedit laborum
          nisi qui suscipit temporibus voluptas? Ipsam, mollitia, natus? Assumenda
          dignissimos expedita ipsum laboriosam molestiae quos recusandae, soluta
          vel?
        </toggle>
      </toggles>
    </div>
  </doc-tab>
</template>

<script>
import {computed} from "vue";
import {ShaplaToggle, ShaplaToggles} from "../../src";
import DocTab from "../components/DocTab.vue";
import SectionProps from "../components/SectionProps.vue";

export default {
  name: "ExampleToggles",
  components: {SectionProps, DocTab, toggles: ShaplaToggles, toggle: ShaplaToggle},
  setup() {
    const properties = computed(() => ShaplaToggles.props);
    const properties2 = computed(() => ShaplaToggle.props);
    const descriptions = {};
    const descriptions2 = {}

    return {properties, properties2, descriptions, descriptions2}
  },
  computed: {
    range() {
      return [...Array(5).keys()];
    },
  },
};
</script>

<style lang="scss" scoped>
.test-toggle-container {
  padding: 2rem;
}
</style>
