<template>
  <div :class="[menuOpen ? 'menu-open' : '']" class="app">
    <nav-menu :menuOpen="menuOpen" :toggle="toggleMenu" />
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <cookie-notice v-if="!this.cookieSeen" :onClickHandler="closeCookie" />
    <Footer v-if="data" :social="data.data.social_icons" />
  </div>
</template>

<script>
  import Prismic from 'prismic-javascript';
  import { API_ENDPOINT } from '@/config/constants';

  import NavMenu from '@/components/NavMenu.vue';
  import Footer from '@/components/Footer.vue';
  import CookieNotice from "@/components/CookieNotice";

  export default {
    name: 'app',
    components: {
      CookieNotice,
      NavMenu,
      Footer,
    },
    data: () => ({
      data: null,
      menuOpen: false,
      error: null,
      cookieSeen: false,
    }),
    watch:{
      $route (){
        this.menuOpen = false;
      }
    },
    methods: {
      getContent () {
        Prismic.api(API_ENDPOINT)
          .then(api => api.getByUID('foot', 'footer'))
          .then(response => this.data = response)
          .catch(e => this.error = `Apologies, there was a ${e} error getting data from the CMS.`);
      },
      toggleMenu: function(e, isScroll = false) {
        this.menuOpen = !this.menuOpen;

        if(this.menu && !isScroll) {
          document.body.classList.add('menu-open');
          return;
        }
        document.body.classList.remove('menu-open');
      },
      closeCookie: function() {
        this.setCookie('notice-seen', 'yes', 999);
        this.cookieSeen = true;
      },
      getCookie: function (name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
      },
      setCookie: function (name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
      },
      onLeave: function() {
        this.leaving = true;
      },
      onEnter: function() {
        this.leaving = false;
      }
    },
    beforeMount () {
      this.getContent();
      this.cookieSeen = !!this.getCookie('notice-seen');
    }
  }
</script>

<style>
  .menu-open {
    overflow: hidden;
    position:fixed;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
