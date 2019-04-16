import Vue from 'vue';

export default {
  addToPage (state, payload) {
    Vue.set(state.pages, payload[0], payload[1]);
  },
  addToArtwork (state, payload) {
    Vue.set(state.artwork, payload[0], {...payload[1].data, ...{body: payload[2].data.title}});
    // Vue.set(state.body, payload[2].slugs[0], payload[2]);
  },
  addToBody (state, payload) {
    Vue.set(state.body, payload[0], payload[1]);
    // Vue.set(state.artwork, payload[0], {...payload[1].data, ...{body: payload[2].data.title}});
  }
}
