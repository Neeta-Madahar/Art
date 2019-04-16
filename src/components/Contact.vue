<template>
  <div id="contact">
    <section-title :flower="2">{{ title }}</section-title>

    <p>{{ text }}</p>

    <button @click="openPopup">
      <i class="icon-namaste" aria-hidden="true"></i>
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
  import * as typeformEmbed from '@typeform/embed'
  import SectionTitle from "@/common/SectionTitle";

  export default {
    components: {SectionTitle},
    name: 'contact',
    props: {
      title: String,
      text: String,
      buttonText: String,
    },
    mounted () {
      this.popup = typeformEmbed.makePopup('https://neetamadahar.typeform.com/to/UOk2Z7', {
        mode: 'popup',
        hideHeaders: true,
        hideFooter: true
      });
    },
    methods: {
      openPopup: function() {
        this.popup.open();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/mixins";

  button {
    padding: 20px;
    border: 2px solid;
    margin: 15px 0;
    transition: background-color .3s ease;
    background-color: transparent;

    @include hover-focus {
      color: $color-white;
      background-color: $color-pink;
      outline: none;

      .icon-namaste {
        color: currentColor;
      }
    }
  }

  .icon-namaste {
    font-size: 2em;
    vertical-align: middle;
    margin-right: 10px;
    color: $color-pink;
  }
</style>
