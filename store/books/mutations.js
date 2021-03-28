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

  ADD_FILTER: (state, filter) => {
    state.filterBy.push(filter);
  },

  REMOVE_FILTER: (state, filter) => {
    state.filterBy = state.filterBy.filter((item) => item !== filter);
  },
};
