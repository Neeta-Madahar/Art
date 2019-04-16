<template>
  <div id='play-space'>
    <breadcrumb :links="links" :title="'Play Space'" />

    <h1>Play Space</h1>

    <div v-for="work in data.work" :key="asText(work.title)" class="row play-space-item">
      <div class="col-sm-6"><img :src="work.image.url" class="img-fluid" alt="" /></div>
      <div class="col-sm-6">
        <h2 class="play-space-title">{{asText(work.title)}}</h2>
        <div v-html="asHtml(work.text)"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { RichText } from 'prismic-dom';
  import { mapState } from 'vuex'
  import Breadcrumb from '@/common/Breadcrumb.vue';
  import store from '@/store/';

  export default {
    name: 'play-space',
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
        return this.$store.getters.getPage('playSpace');
      }
    }),
    async beforeRouteEnter (to, from, next) {
      if (!store.getters.getPage('playSpace')) {
        await store.dispatch('getPlaySpacePage');
      }
      next();
    }
  }
</script>

<style lang="scss">
  .play-space {
    &-title {
      margin: 0 0 20px;
    }

    &-item {
      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }
  }
</style>
