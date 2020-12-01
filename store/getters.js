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
    const theBook = state.books.find((book) => book.isbn === isbn);
    console.log('GET BOOK BY ISBN', isbn, theBook && theBook.title);
    return theBook;
  },
};
