<template>
  <h2>
    <slot></slot>
    <i :class="`icon-floral_${flower}`" aria-hidden="true"></i>
  </h2>
</template>

<script>
  export default {
    name: 'section-title',
    props: {
      flower: Number
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/mixins";

  h2 {
    border-bottom: 4px solid;
    font-size: 32px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    text-align: center;

    @include sm {
      width: 350px;
    }
  }
</style>
