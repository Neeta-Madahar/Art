<template>
  <div id='works'>
    <breadcrumb :links="links" :title="'Works'" />

    <h1>Works</h1>

    <div class="row">
      <router-link v-for="work in data" :key="asText(work.data.title)" class="col-sm-6 col-md-3 col-xs-12 works-link" :to="`/works/${work.url}`">
        <div :style="{backgroundImage: `url(${work.image})`}" class="works-image" />
        <strong>{{asText(work.data.title)}}</strong> - (<span v-html="asText(work.data.year_range).replace(/ /g, '&nbsp;')"></span>)
      </router-link>
    </div>
  </div>
</template>

<script>
  import { RichText } from 'prismic-dom';
  import { mapState } from 'vuex'
  import Breadcrumb from '@/common/Breadcrumb.vue';
  import store from '@/store/';

  export default {
    name: 'works',
    components: {Breadcrumb},
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
        return this.$store.getters.getPage('works');
      }
    }),
    async beforeRouteEnter (to, from, next) {
      if (!store.getters.getPage('works')) {
        await store.dispatch('getWorksPage');
      }
      next();
    }
  }
</script>

<style lang="scss">
  @import "../assets/sass/variables";
  @import "../assets/sass/mixins";

  .works {
    &-image {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      &:before {
        content: '';
        display: block;
        padding-top: 100%;
      }

    }

    &-link {
      color: $color-grey;
      overflow: hidden;

      @include hover-focus {
        color: $color-green;
      }
    }
  }
</style>
