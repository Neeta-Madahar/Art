<template>
  <div id='links'>
    <breadcrumb :links="links" :title="'Links'" />

    <h1>Links</h1>

    <div v-html="asHtml(data.links_main_text)"></div>

    <h2>Galleries</h2>


    <ul class="list-reset">
      <li v-for="gallery in data.galleries" :key="asText(gallery.gallery_name)">
        <a :href="gallery.link.url" :target="gallery.link.target" class="links-resource-link">{{asText(gallery.gallery_name)}}</a>
      </li>
    </ul>

    <h2>Resources</h2>

    <ul class="list-reset">
      <li v-for="resource in data.resources" :key="asText(resource.resource_title)">
        <list-entry
          :heading="asText(resource.resource_title)"
          :text="asText(resource.resource_description)"
          :url="resource.resource_link.url"
        />
      </li>
    </ul>
  </div>
</template>

<script>
  import { RichText } from 'prismic-dom';
  import { mapState } from 'vuex'
  import Breadcrumb from '@/common/Breadcrumb.vue';
  import ListEntry from '@/common/ListEntry.vue';
  import store from '@/store/';

  export default {
    name: 'links',
    components: {Breadcrumb, ListEntry},
    data: () => ({
      links: [
        {title: 'Home', url: '/'},
      ],
    }),
    methods: {
      asHtml: RichText.asHtml,
      asText: RichText.asText,
    },
    computed: mapState({
      data: function() {
        return this.$store.getters.getPage('links');
      }
    }),
    async beforeRouteEnter (to, from, next) {
      if (!store.getters.getPage('link')) {
        await store.dispatch('getLinksPage');
      }
      next();
    }
  }
</script>

<style lang="scss">
  @import "../assets/sass/variables";
  @import "../assets/sass/mixins";

  .links {
    &-resource-link {
      font-family: $font-rubik-bold;

      @include hover-focus {
        text-decoration: underline;
      }
    }

    &-item {
      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }
  }
</style>
