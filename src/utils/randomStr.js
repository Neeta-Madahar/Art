// Generate a random string.
// Mainly used for generating unique ids

export default (str = '') => {
  if (str.length) {
    return `${str.replace(/ +/g, '-')}-${Math.random().toString(36).substr(2, 10)}`.toLowerCase();
  }

  return Math.random().toString(36).substr(2, 10);
};
