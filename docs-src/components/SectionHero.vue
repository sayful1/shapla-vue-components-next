<template>
  <section class="section section-hero">
    <h1 class="section-hero__title">
      {{ heading }}
    </h1>
    <div class="subtitle">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: "SectionHero",
  props: {
    heading: { type: String, default: "" },
  },
};
</script>

<style lang="scss">
.section-hero {
  margin-bottom: 3rem;

  &__title {
    font-size: 3.75rem;

    + .subtitle {
      margin-top: -1rem;
    }
  }
}
</style>
