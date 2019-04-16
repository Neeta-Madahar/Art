export const getPage = state => page => {
  return state.pages[page];
};

export const getArtwork = state => page => {
  return state.artwork[page];
};


export const getBody = state => page => {
  return state.body[page];
};
