<template>
  <div class="cookie-notice" id="cookie-notice">
    <div class="container">
      <p>
        This website uses cookies.
        By continuing to use this website you are agreeing to my
        <a href="https://neetamadahar.com/privacy-policy">Privacy Policy</a>.
      </p>

      <button type="button" class="cookie-notice__button" id="cookie-dismiss" @click="this.onClickHandler">
        <span aria-hidden="true">X</span>
        <span class="sr-only">Dismiss notice</span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cookie-notice',
    props: {
      onClickHandler: Function,
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/mixins";

  .cookie-notice {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0,0,0,.6);
    color: #FFFFFF;
    padding: 20px;
    box-sizing: border-box;

    .container {
      justify-content: space-between;
      display: flex;
      padding: 0 15px;
    }

    &__button {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 1rem;
    }

    p {
      margin: 0;
    }

    a {
      color: #FFFFFF;
      text-decoration: underline;
    }

    a:hover,
    a:focus {
      color: #EAEAEA;
      text-decoration: none;
    }
  }

</style>
