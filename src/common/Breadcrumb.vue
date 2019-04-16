<template>
    <ul id="breadcrumb" class="breadcrumb">
      <li v-if="link" v-for="link in items" :key="link.title">
        <router-link :to="link.url" v-if="link.url" class="breadcrumb-link">{{link.title}}</router-link>
        <span v-else class="breadcrumb-link">{{link}}</span>
      </li>
    </ul>
</template>

<script>
  export default {
    name: 'breadcrumb',
    props: {
      links: Array,
      title: String
    },
    computed: {
      items: function() {
        return [
          ...this.links,
          this.title
        ]

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/variables";
  @import "../assets/sass/mixins";

  .breadcrumb {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    margin-bottom: 20px;
    font-size: $font-size-s;

    &-link {
      padding: 5px 5px 5px 0;
      display: inline-block;
    }

    a {
      @include hover-focus {
        text-decoration: underline;
      }
    }

    li {
      &:before {
        content: '>';
        display: inline-block;
        margin: 0 5px 0 2.5px;
        vertical-align: text-top;

      }
      &:first-child:before {
        display: none;
      }
    }



    a {
      color: $color-green;
    }
  }
</style>
