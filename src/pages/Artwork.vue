<template>
  <div id='artwork'>
    <breadcrumb :links="links" :title="asText(data.artwork_title)"/>

    <h1>{{asText(data.artwork_title)}} - {{asText(data.year)}}</h1>

    <section class="row artwork-details">
      <div class="col-sm-3">
        <div v-html="asHtml(data.text)"></div>

        share
      </div>
      <div class="col-sm-9">
        <img :src="data.image.url" alt="" class="img-fluid artwork-image">
      </div>
    </section>
  </div>
</template>

<script>
  import { RichText } from 'prismic-dom';
  import { mapState } from 'vuex'
  import Breadcrumb from '@/common/Breadcrumb.vue';
  import store from '@/store/';

  export default {
    name: 'artwork',
    components: {Breadcrumb},
    methods: {
      asHtml: RichText.asHtml,
      asText: RichText.asText,
    },
    computed: mapState({
      data: function() {
        return this.$store.getters.getArtwork(this.$route.params.work);
      },
      links: function() {
        return [
          {title: 'Home', url: '/'},
          {title: 'Works', url: '/works'},
          {title: this.asText(this.$store.getters.getArtwork(this.$route.params.work).body), url: `/works/${this.$route.params.body}`}
        ]

      }
    }),
    async beforeRouteEnter (to, from, next) {
      const { work, body } = to.params;
      if (!store.getters.getArtwork(to.params.work)) {
        await store.dispatch('getArtwork', { work, body });
      }
      next();
    }
  }
</script>

<style lang="scss">
  @import "../assets/sass/variables";
  @import "../assets/sass/mixins";

  .artwork {
    &-details.row {
      flex-direction: column-reverse;

      @include sm {
        flex-direction: row;
      }
    }

    &-image {
      margin-bottom: 20px;

      @include sm {
        margin: 0;
      }
    }
  }
</style>
