<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-xs-8">
          &copy; {{ new Date().getFullYear() }} neetamadahar.com | Website by <a href="https://jupiterandthegiraffe.com">Jupiter and the Giraffe</a>
        </div>
        <div class="col-xs-4 icons" v-if="social">
          <a v-for="icon in social" class="footer__icon-link" :href="icon.link.url" :key="icon.link.url" :target="icon.link.target">
            <i :class="`icon-${icon.icon}`" aria-hidden="true"/>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import { RichText } from 'prismic-dom';

  export default {
    props: {
      social: Array,
    },
    methods: {
      asText: RichText.asText,
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/_variables.scss';
  @import '../assets/sass/_mixins.scss';

  .footer {
    background-color: $color-grey;
    color: $color-white;
    font-size: 12px;

    @include sm {
      font-size: $font-size-s;
    }

    &__icon-link {
      font-size: 25px;
      padding: 10px;
      transition: background-color .3s ease;
      vertical-align: middle;

      i {
        vertical-align: middle;

        &::before {
          transition: color .3s ease;
        }

      }

      @include hover-focus {
        outline: none;
        background-color: white;
        text-decoration: none;

        i::before {
          color: $color-pink;
        }
      }
    }
  }

  .icons {
    text-align: right;
  }


  a {
    display: inline-block;
    color: $color-white;
    transition: color .3s ease;

    @include hover-focus {
      text-decoration: underline;
      color: $color-green;
    }
  }

  .row {
    justify-content: space-between;
    align-items: center;
  }

  .container {
    padding: 0 15px;
  }

</style>
