import { getField } from 'vuex-map-fields';

export default {
  getField,

  isLoggedIn: (state) => {
    try {
      return state.authUser.id !== null;
    } catch {
      return false;
    }
  },

  getBookByIsbn: (state) => (isbn) => {
    const book = state.books.allBooks[isbn];
    console.log('GET BOOK BY ISBN', isbn, book && book.title);
    return book;
  },
};
