<template>
  <div class='contact' v-if="data">
    <Breadcrumb :links="links" :title="'Contact'" />
    <h1>Contact</h1>

    <div v-html="asHtml(data.text)" v-if="data.text" class="contact-text"></div>

    <div class="contact-form-container">
      <form class="contact-form" @submit.prevent="submitForm">
        <div v-if="errors.length">
          <p>
            <b>Please correct the following error(s):</b>
          </p>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>

        <div class="form-input">
          <label for="name">Name:</label>
          <input type="text" name="name" id="name" required v-model="name">
        </div>
        <div class="form-input">
          <label for="email">Email:</label>
          <input type="email" id="email" name="_replyto" required v-model="email">
        </div>
        <div class="form-input">
          <label for="message">Message:</label>
          <textarea name="message" id="message" cols="30" rows="10" required v-model="message"></textarea>
        </div>
        <button type="submit">
          <i class="icon-pencil2" aria-hidden="true"></i>
          Send a message
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import {RichText} from 'prismic-dom';
  import { mapState } from 'vuex'
  import Breadcrumb from '@/common/Breadcrumb';
  import store from '../store/';

//  const formAction = 'https://formspree.io/address@email.tld';

  export default {
    name: 'contact',
    components: {
      Breadcrumb
    },
    data: () => ({
      name: null,
      message: null,
      email: null,
      links: [
        {title: 'Home', url: '/'}
      ],
      errors: [],
    }),
    methods: {
      asHtml: RichText.asHtml,
      submitForm () {
        if (this.name && this.message && this.email) {
          return true;
        }

        this.errors = [];

        if (!this.name) {
          this.errors.push('Name required.');
        }
        if (!this.message) {
          this.errors.push('Email is required.');
        }
        if (!this.email) {
          this.errors.push('Name required.');
        }
      }
    },
    computed: mapState({
      data: function() {
        return this.$store.getters.getPage('contact');
      }
    }),
    async beforeRouteEnter (to, from, next) {
      if (!store.getters.getPage('contact')) {
        await store.dispatch('getContactPage');
      }
      next();
    }
  }
</script>

<style lang="scss">
  @import '../assets/sass/variables';

  .contact {
    &-form-container {
      background: $color-mid-grey;
      padding: 50px;
      margin-bottom: 40px;
    }

    &-form {
      max-width: 450px;
      margin: 0 auto;
    }

    &-text {
      margin: 40px 0;
    }
  }
  .form-input {
    margin-bottom: 20px;
  }


</style>
