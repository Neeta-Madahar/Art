<template>
  <section class="text">
    <a class="list-entry-heading" v-if="url" :href="url" target="_blank" rel="noopener noreferrer">
      {{ heading }}
    </a>
    <h4 class="list-entry-heading" :class="{'list-entry-heading--with-sub': subHeading}" v-else>{{ heading }}</h4>

    <strong v-if="subHeading" class="list-entry-sub-heading">{{ subHeading }}</strong>

    <div v-html="text" class="text-content" />

  </section>
</template>

<script>
  export default {
    name: 'list-entry',
    props: {
      heading: String,
      subHeading: String,
      text: String,
      url: String,
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/mixins";

  p {
    margin: 0;
  }

  .list-entry-heading {
    margin-bottom: 15px;
    font-family: $font-rubik-bold;
    font-size: $font-size-s;

    &--with-sub {
      margin-bottom: 5px;
    }
  }

  .list-entry-sub-heading {
    font-size: $font-size-s;
    margin-bottom: 15px;
  }

  .text {
    @include sm {
      flex-grow: 1;
      margin-bottom: 10px;
    }
  }

  a.list-entry-heading {
    display: inline-block;
    text-decoration: none;

    @include hover-focus {
      text-decoration: underline;
      outline: none;
    }
  }

  .text-content {
    max-width: 800px;
  }
</style>
