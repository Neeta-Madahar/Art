<template>
  <section id="articles">
    <h3>{{ title }}</h3>

    <div v-for="(link, index) in links" :key="`resource-${index}`" class="item">
      <list-entry :heading="link.title" :text="link.description" :url="link.url" />
    </div>
  </section>
</template>

<script>
  import SectionTitle from '@/common/SectionTitle.vue';
  import ListEntry from "@/common/ListEntry";

  export default {
    name: 'resource',
    components: {
      SectionTitle,
      ListEntry
    },
    props: {
      title: String,
      links: Array,
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/mixins";

  a {
    font-family: $font-rubik;
  }

  .description {
    color: $color-grey;
    font-size: 16px;
    @include sm {
      font-size: $font-size-body
    }
  }

  .item {
    display: flex;
    margin-bottom: 50px;
  }
</style>
