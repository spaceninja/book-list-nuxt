import { firstBy } from 'thenby';

export default {
  getBookByIsbn: (state) => (isbn) => {
    const book = state.allBooks[isbn];
    console.log('GET BOOK BY ISBN', isbn, book && book.title);
    return book;
  },

  getFilteredBooks:
    (state) =>
    (filters, allBooks = state.allBooks) => {
      let bookArray = Object.values(allBooks);
      filters.forEach((key) => {
        bookArray = bookArray.filter((book) => book[key]);
      });
      return bookArray;
    },

  getSortedBooks:
    (state) =>
    (sort, allBooks = state.allBooks) => {
      const bookArray = Object.values(allBooks);
      const firstByOptions = {
        ignoreCase: true,
        direction: sort.firstByOrder === 'descending' ? -1 : 0,
      };
      const thenByOptions = {
        ignoreCase: true,
        direction: sort.thenByOrder === 'descending' ? -1 : 0,
      };
      return bookArray.sort(
        firstBy(sort.firstBy, firstByOptions).thenBy(sort.thenBy, thenByOptions)
      );
    },

  getSortedAndFilteredBooks: (state, getters) => (filters, sort) => {
    let bookArray = Object.values(state.allBooks);
    bookArray = getters.getFilteredBooks(filters, bookArray);
    bookArray = getters.getSortedBooks(sort, bookArray);
    return bookArray;
  },
};
