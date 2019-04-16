<template>
  <div id='profile' :class="bodyClass">
    <breadcrumb :links="links" :title="'Profile'"/>

    <h1>Profile</h1>

    <div class="section profile-table-of-contents">
      <ul class="list-reset profile-table-of-contents-list">
        <li><a href="#bio">Biography</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#solo-two-person">Selected Solo and Two-Person Shows</a></li>
        <li><a href="#group">Selected Group Shows</a></li>
        <li><a href="#collections">Selected Collections</a></li>
        <li><a href="#awards-grants-residencies">Selected Awards, Grants and Residencies</a></li>
      </ul>
    </div>

    <section id="bio" class="section bio-section">
      <div class="row profile-header-row">
        <h2 class="col-sm">Bio</h2>
        <div class="col-sm text-right">
          <a href="#" class="profile-print-btn" v-on:click.stop.prevent="printBio('bio')">Print Bio</a>
        </div>
      </div>

      <div class="row">
        <div class="col-sm profile-bio" v-html="asHtml(data.bio)"></div>
        <div class="col-sm">
          <img :src="data.image.url" alt="" class="img-fluid">
        </div>
      </div>
    </section>

    <div class="cv-section">
      <section class="section" id="education" v-if="data.education">
        <div class="row profile-header-row">
          <h2 class="col-sm">Education</h2>
          <div class="col-sm text-right">
            <a href="#" class="profile-print-btn" v-on:click.stop.prevent="printBio('cv')">Print CV</a>
          </div>
        </div>

        <ul class="education-list list-reset" >
          <li v-for="degree in data.education" :key="randomStr(`${degree.year}-${degree.title}`)" class="education-list-item">
            <div class="education-list-year">{{asText(degree.year)}}</div>
            <div class="education-list-text" v-html="asHtml(degree.title)"></div>
          </li>
        </ul>
      </section>

      <section class="section" id="solo-two-person" v-if="data['selected_solo_and_two-person_shows']">
        <h2>Selected Solo and Two-Person Shows</h2>

        <ul class="education-list list-reset">
          <li v-for="show in data['selected_solo_and_two-person_shows']" :key="randomStr(`${show.year}-${show.title}`)" class="education-list-item">
            <div class="education-list-year">{{asText(show.year)}}</div>
            <div class="education-list-text" v-html="asHtml(show.title)"></div>
          </li>
        </ul>
      </section>

      <section class="section" id="group" v-if="data.selected_group_shows">
        <h2>Selected Group Shows</h2>

        <ul class="education-list list-reset">
          <li v-for="show in data.selected_group_shows" :key="randomStr(`${show.year}-${show.title}`)" class="education-list-item">
            <div class="education-list-year">{{asText(show.year)}}</div>
            <div class="education-list-text" v-html="asHtml(show.title)"></div>
          </li>
        </ul>
      </section>

      <section class="section" id="collections" v-if="data.selected_collections">
        <h2>Selected Collections</h2>

        <ul class="education-list list-reset">
          <li v-for="collection in data.selected_collections" :key="randomStr(`${collection.year}-${collection.title}`)" class="education-list-item">
            <div class="education-list-year">{{asText(collection.year)}}</div>
            <div class="education-list-text" v-html="asHtml(collection.title)"></div>
          </li>
        </ul>
      </section>

      <section class="section" id="awards-grants-residencies" v-if="data.selected_awards__grants_and_residencies">
        <h2>Selected Awards, Grants and Residencies</h2>

        <ul class="education-list list-reset">
          <li v-for="award in data.selected_awards__grants_and_residencies" :key="randomStr(`${award.year}-${award.title}`)" class="education-list-item">
            <div class="education-list-year">{{asText(award.year)}}</div>
            <div class="education-list-text" v-html="asHtml(award.title)"></div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import { RichText } from 'prismic-dom';
  import { mapState } from 'vuex'
  import Breadcrumb from '@/common/Breadcrumb.vue';
  import store from '@/store/';
  import randomStr from '@/utils/randomStr';

  export default {
    name: 'profile',
    components: {Breadcrumb},
    data: () => ({
      links: [
        {title: 'Home', url: '/'}
      ],
      bodyClass: '',
    }),
    methods: {
      printBio: function(type) {
        this.bodyClass = type;
        setTimeout(() => {
          window.print();
        }, 0);
      },
      asHtml: RichText.asHtml,
      asText: RichText.asText,
      randomStr,
    },
    computed: mapState({
      data: function() {
        return this.$store.getters.getPage('profile');
      }
    }),
    async beforeRouteEnter (to, from, next) {
      if (!store.getters.getPage('profile')) {
        await store.dispatch('getProfilePage');
      }
      next();
    }
  }
</script>

<style lang="scss">
  @import "../assets/sass/variables";
  @import "../assets/sass/mixins";

  .profile {
    &-bio {
      text-align: justify;
    }

    &-print-btn {
      color: $color-green;
    }

    &-header-row {
      margin: 40px;

      h2 {
        margin: 0;
      }
    }

    &-table-of-contents {
      font-size: 20px;

      li {
        margin-bottom: 15px;
      }

      a {
        color: $color-grey;
        text-decoration: underline;

        @include hover-focus {
          text-decoration: none;
        }
      }
    }
  }
  .education-list {
    &-item {
      margin-bottom: 30px;

      @include sm {
        display: flex;
      }
    }

    &-text {
      p {
        margin: 0;
      }
    }

    &-year {
      font-weight: 700;
      margin-bottom: 10px;
      display: block;

      @include sm {
        margin: 0;
        width: 200px;
        display: inline-block;
      }
    }
  }

  @media print {
    .bio,.cv {
      h1 { display: none !important; }
      .profile-table-of-contents { display: none !important; }
      .profile-print-btn { display: none !important; }
    }

    .bio {
      .cv-section { display: none !important; }
    }

    .cv {
      .bio-section { display: none !important; }
    }
  }
</style>
