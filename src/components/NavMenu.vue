<template>
  <div class="header column center-xs">
    <div class="container">
      <button @click="toggle" :class="{active: menuOpen}" class="nav-button">
        <i class="icon-burger2 open-icon" aria-hidden="true"/>
        <i class="icon-close2 close-icon" aria-hidden="true"/>

        <span class="sr-only">{{menuOpen ? 'Close navigation' : 'Open navigation'}}</span>
      </button>

      <nav class="header-navigation">
        <h1 class="header-navigation-heading">
          <router-link to="/" exact>
            <img class="logo" src="../assets/images/neeta-madahar.svg" alt="Neeta Madahar">
          </router-link>
        </h1>

        <div class="header-navigation-nav" :class="{active: menuOpen}">
          <ul class="clear-fix">
            <li>
              <router-link to="/" exact>Home</router-link>
            </li>
            <li>
              <router-link to="/profile">Profile</router-link>
            </li>
            <li>
              <router-link to="/works">Works</router-link>
            </li>
            <li>
              <router-link to="/links">Links</router-link>
            </li>
            <li>
              <router-link to="/playspace">Play Space</router-link>
            </li>
            <li>
              <router-link to="/contact">Contact</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'nav-menu',
    props: {
      toggle: Function,
      menuOpen: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/_mixins.scss';
  @import '../assets/sass/_utilities.scss';

  .close-icon {
    display: none;
  }

  .header-navigation-heading {
    border: none;
    margin: 0;
  }

  .nav-button {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px;
    z-index: 10;

    @include md {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &.active {
      position: fixed;
      color: $color-white;

      .close-icon {
        display: block;
      }

      .open-icon {
        display: none;
      }
    }
  }

  .header-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-navigation-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $color-grey;
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s ease, visibility 0s linear .3s;
    z-index: 9;

    @include md {
      position: static;
      opacity: 1;
      visibility: visible;
      background: transparent;
    }

    ul {
      padding: 80px 0 0 0;
      margin: 0;
      list-style: none;

      @include md {
        text-align: right;
        padding: 0;
        display: flex;
        justify-content: flex-end;
      }
    }

    li {
      margin-bottom: 30px;

      @include md {
        margin: 0;
        padding: 20px;
      }
    }

    a {
      color: $color-white;
      text-decoration: none;
      display: block;
      transition: color .3s ease;
      font-family: $font-rubik;
      text-align: center;

      &.router-link-active {
        text-decoration: underline;
      }

      &:hover {
        color: $color-green;
      }

      @include md {
        color: $color-grey;
      }
    }

    &.active {
      opacity: 1;
      visibility: visible;
      -webkit-transition-delay: 0s;
      transition-delay: 0s;
    }
  }
</style>
