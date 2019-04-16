<template>
  <div id='body-of-works' class="works">
    <breadcrumb :links="links" :title="asText(data.data.title)"/>

    <h1>{{asText(data.data.title)}}</h1>

    <div :class="{'show': show}" v-if="description.text.length > 2">
      <div v-html="asHtml(description.excerpt)" class="excerpt" />

      <div v-html="asHtml(description.text)" class="text"/>

      <button @click="toggleShow" class="works-view-more">View {{show ? 'less' : 'more...'}}</button>
    </div>
    <div v-else v-html="asHtml(description.text)" />

    <div class="row">
      <router-link
        v-for="(artwork, index) in data.data.related_works"
        :to="`/works/${$route.params.body}/${artwork.artwork.slug}`"
        class="col-sm-6 col-xs-12 works-link works-item"
        :key="artwork.artwork.slug"
      >
        <img :src="data.work[index].data.image.url" class="img-fluid works-image" />
        <strong>{{asText(data.work[index].data.artwork_title)}}</strong> - {{asText(data.work[index].data.year)}}
      </router-link>
      <div
        v-for="artwork in data.data.other_work"
        class="col-sm-6 col-xs-12 works-item"
        :key="asText(artwork.title1)"
      >
        <img :src="artwork.image.url" class="img-fluid works-image" />
        {{asText(artwork.title1)}} - {{asText(artwork.date)}}
        <div v-html="asHtml(artwork.text)" class="works-description"/>
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
    name: 'artwork',
    components: {Breadcrumb},
    data: () => ({
      links: [
        {title: 'Home', url: '/'},
        {title: 'Works', url: '/works' }
      ],
      show: false,
    }),
    methods: {
      asHtml: RichText.asHtml,
      asText: RichText.asText,
      toggleShow: function() {
        this.show = !this.show;
      }
    },
    computed: mapState({
      data: function() {
        return this.$store.getters.getBody(this.$route.params.body);
      },
      description: function() {
        const description = this.$store.getters.getBody(this.$route.params.body).data.description;
        return {
          excerpt: description.slice(0, 2),
          text: description,
        }
      }
    }),
    async beforeRouteEnter (to, from, next) {
      if (!store.getters.getBody(to.params.body)) {
        await store.dispatch('getBody', to.params.body);
      }
      next();
    }
  }
</script>

<style lang="scss">
  @import "../assets/sass/variables";
  @import "../assets/sass/mixins";

  .works {
    &-link {
      color: $color-grey;
    }

    &-item {
      margin-bottom: 40px;
    }

    &-image {
      margin-bottom: 10px;
    }

    &-description {
      margin-top: 10px;
    }

    &-view-more {
      margin: 0 0 20px 0;
      border: 1px solid $color-grey;
      padding: 5px 10px;
      transition: color .3s ease, border .3s ease;

      @include hover-focus {
        color: $color-green;
        border-color: $color-green;
      }
    }

    .text {
      display: none;
    }

    .show {
      .text {
        display: block;
      }
      .excerpt {
        display: none;
      }
    }
  }
</style>
