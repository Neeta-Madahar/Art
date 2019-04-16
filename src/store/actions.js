/* eslint-disable no-console */
import Prismic from 'prismic-javascript';
import {API_ENDPOINT} from '@/config/constants';

export const getContactPage = async ({ commit }) => {
  await Prismic.api(API_ENDPOINT)
     .then(api => api.getByUID('contact', 'contact'))
     .then(response => commit('addToPage', ['contact', response.data]))
     .catch(e => console.log(`Apologies, there was a ${e} error getting data from the CMS.`));
};

export const getLinksPage = async ({ commit }) => {
  await Prismic.api(API_ENDPOINT)
    .then(api => api.getByUID('link', 'links'))
    .then(response => commit('addToPage', ['links', response.data]))
    .catch(e => console.log(`Apologies, there was a ${e} error getting data from the CMS.`));
};

export const getHomePage = async ({ commit }) => {
  await Prismic.api(API_ENDPOINT)
    .then(api => api.getByUID('homepage', 'home'))
    .then(response => commit('addToPage', ['home', response.data]))
    .catch(e => console.log(`Apologies, there was a ${e} error getting data from the CMS.`));
};

export const getWorksPage = async ({ commit }) => {
  let theApi;
  await Prismic.api(API_ENDPOINT)
    .then(api => {
      theApi = api;
      return theApi.getByUID('works', 'works')
    })
    .then(response => {
      const works = [];
      response.data.body_of_works.forEach(work => works.push(theApi.getByUID(work.link.type, work.link.slug)));
      return Promise.all(works)
        .then(data => data);
    })
    .then(response => {
      const work = [];
      response.forEach(body => {
        const relatedWorks = body.data.related_works;
        const randomImage = relatedWorks[Math.floor(Math.random() * relatedWorks.length - 1) + 1];
        work.push(theApi.getByUID(randomImage.artwork.type, randomImage.artwork.slug));
      });
      return Promise.all(work)
        .then(data =>
          response.map((body, index) =>
            ({data: body.data, image: data[index].data.image.url, url: response[index].slugs[0] })));
    })
    .then(response => {
      commit('addToPage', ['works', response])
    })
    .catch(e => console.log(`Apologies, there was a ${e} error getting data from the CMS.`));
};

export const getProfilePage = async ({ commit }) => {
  await Prismic.api(API_ENDPOINT)
    .then(api => api.getByUID('profile', 'profile'))
    .then(response => commit('addToPage', ['profile', response.data]))
    .catch(e => console.log(`Apologies, there was a ${e} error getting data from the CMS.`));
};

export const getBody = async ({ commit }, body) => {
  let theApi;
  await Prismic.api(API_ENDPOINT)
    .then(api => {
      theApi = api;
      return theApi.getByUID('body_of_works', body)
    })
    .then(response => {
      const works = [];
      response.data.related_works.forEach(work => works.push(theApi.getByUID(work.artwork.type, work.artwork.slug)));
      return Promise.all(works)
        .then(data => ({ data: response.data, ...{work: data}}))
    })
    .then(response => {
      commit('addToBody', [body, response])
    })
    .catch(e => console.log(`Apologies, there was a ${e} error getting data from the CMS.`));
};

export const getArtwork = async ({ commit }, artwork) => {
  await Prismic.api(API_ENDPOINT)
    .then(api => {
      return Promise.all([
        api.getByUID('artwork', artwork.work),
        api.getByUID('body_of_works', artwork.body)
      ]);
    })
    .then(response => {
      commit('addToArtwork', [artwork.work, response[0], response[1]])
    })
    .catch(e => console.log(`Apologies, there was a ${e} error getting data from the CMS.`));
};

export const getPlaySpacePage = async ({commit}) => {
  await Prismic.api(API_ENDPOINT)
    .then(api => api.getByUID('play_spac', 'play_space'))
    .then(response => commit('addToPage', ['playSpace', response.data]))
    .catch(e => console.log(`Apologies, there was a ${e} error getting data from the CMS.`));
};
