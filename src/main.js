import Vue from 'vue';
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics';

import store from './store';

import App from '@/App.vue';
import Home from '@/pages/Home.vue';
import Contact from '@/pages/Contact.vue';
import Links from '@/pages/Links.vue';
import PlaySpace from '@/pages/PlaySpace.vue';
import Profile from '@/pages/Profile.vue';
import Works from '@/pages/Works.vue';
import Artwork from '@/pages/Artwork.vue';
import BodyOfWorks from '@/pages/BodyOfWorks.vue';
import Preview from '@/pages/Preview.vue';

import 'es6-promise/auto';
import './assets/sass/main.scss';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/works/:body/:work', component: Artwork },
    { path: '/works/:body', component: BodyOfWorks },
    { path: '/works', component: Works },
    { path: '/links', component: Links },
    { path: '/playspace', component: PlaySpace },
    { path: '/contact', component: Contact },
    { path: '/preview', component: Preview },
    { path: '/:uid', redirect: '/' },
  ],
});

new Vue({
  el: '#app',
  router,
  store,
  data: {
    show: true
  },
  render: h => h(App),
});


Vue.use(VueAnalytics, {
  id: ['UA-128817330-1', 'UA-128817330-2'],
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  },
  set: [
    { field: 'anonymizeIp', value: true }
  ]
});
