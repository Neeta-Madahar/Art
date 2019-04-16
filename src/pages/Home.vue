<template>
  <div id='home'>
    <div class="slideshow" v-if="data">
      <router-link :to="`/${image.link.slug}`"
        class="slideshow-slide"
        v-for="(image, index) in data.images"
        :key="asText(image.title)"
        :class="[currentSlide === index + 1 ? 'active' : '']"
      >
          <img :src="image.image.url" class="slideshow-image" />
          <h2 class="slideshow-heading" v-if="image.title">{{asText(image.title)}}</h2>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { RichText } from 'prismic-dom';
  import { mapState } from 'vuex'
  import store from '../store/';

  export default {
    name: 'home',
    components: {},
    data: () => ({
      currentSlide: 1,
    }),
    methods: {
      asText: RichText.asText,
      clampSlides(nextSlide) {
        if (nextSlide > this.data.images.length) {
          nextSlide = 1;
        }

        this.currentSlide = nextSlide;
      },
      startSlider() {
        window.setInterval(() => {
          this.clampSlides(this.currentSlide + 1);
        }, 10000);
      },
    },
    computed: mapState({
      data: function() {
        return this.$store.getters.getPage('home');
      }
    }),
    async beforeRouteEnter (to, from, next) {
      if (!store.getters.getPage('home')) {
        await store.dispatch('getHomePage');
      }
      next();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/variables";

  .slideshow {
    position: relative;
    overflow: hidden;

    &-slide {
      color: $color-grey;
      opacity: 0;
      transition: opacity 1s linear;
      position: absolute;

      &.active {
        opacity: 1;
        position: static;
      }
    }

    &-image {
      width: 100%;
      height: auto;
    }

    &-heading {
      font-family: $font-rubik;
      margin: 0;
    }
  }
</style>
