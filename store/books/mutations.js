const emptyBook = {
  title: '',
  series: '',
  authorFirst: '',
  authorLast: '',
  rating: '',
  length: '',
  isbn: '',
  release: '',
  thumbnail: '',
  textSnippet: '',
  source: '',
  note: '',
  purchased: false,
  prioritize: false,
};

export default {
  SET_ACTIVE_BOOK: (state, book) => {
    state.selectedBook = { ...emptyBook, ...book };
  },

  UNSET_ACTIVE_BOOK: (state) => {
    state.selectedBook = {};
  },
};
