export default {
  getBookByIsbn: (state) => (isbn) => {
    const book = state.allBooks[isbn];
    console.log('GET BOOK BY ISBN', isbn, book && book.title);
    return book;
  },
};
