import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import EditPage from '@/pages/edit/_isbn.vue';
import BookEdit from '@/components/BookEdit.vue';
import FormInput from '@/components/FormInput.vue';

jest.mock('vuex-map-fields', () => ({
  getterType: jest.fn(),
  mapFields: jest.fn(),
}));

const $router = {
  push: jest.fn(),
};

const $route = {
  params: {
    isbn: '123',
  },
};

const actions = {
  saveBook: jest.fn(),
  setActiveBook: jest.fn(),
};

const store = {
  modules: {
    books: {
      namespaced: true,
      actions,
    },
  },
};

const stubs = {
  BookEdit: {
    template: '<div data-testid="book-edit" />',
  },
  Alert: {
    template: '<div data-testid="alert" />',
  },
};

const book = {
  title: 'Book Title',
  authorFirst: 'John',
  authorLast: 'Doe',
  rating: 5,
  length: 1,
  isbn: '123',
};

describe('pages/edit/_isbn.vue', () => {
  it('shows edit form if logged in', () => {
    const { getByTestId } = render(EditPage, {
      computed: {
        selectedBook: () => book,
        getBookByIsbn: () => () => book,
        isLoggedIn: () => true,
      },
      mocks: { $route },
      store,
      stubs,
    });
    getByTestId('book-edit');
  });

  it('hides edit form if logged out', () => {
    const { queryByTestId } = render(EditPage, {
      computed: {
        getBookByIsbn: () => () => book,
        isLoggedIn: () => false,
      },
      mocks: { $route },
      store,
      stubs,
    });
    expect(queryByTestId('book-edit')).not.toBeInTheDocument();
  });

  it('shows error if book not found', () => {
    const { getByTestId } = render(EditPage, {
      computed: {
        selectedBook: () => null,
        getBookByIsbn: () => () => book,
        isLoggedIn: () => true,
      },
      mocks: { $route },
      store,
      stubs,
    });
    getByTestId('alert');
  });

  it('can save book', async () => {
    const { getByRole, getByLabelText } = render(EditPage, {
      computed: {
        selectedBook: () => book,
        getBookByIsbn: () => () => book,
        isLoggedIn: () => true,
      },
      mocks: { $route, $router },
      store,
      stubs: { BookEdit, FormInput },
    });

    // mounted lifecycle hook sets book to ISBN from URL
    expect(actions.setActiveBook).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      book // The book fetched by getBookByIsbn
    );

    // fill out the form by hand because we stubbed the Vuex functions
    const isbn = getByLabelText('ISBN');
    const title = getByLabelText('Title');
    const authorFirst = getByLabelText('Author First Name');
    const authorLast = getByLabelText('Author Last Name');
    const rating = getByLabelText('Rating');
    const length = getByLabelText('Length');
    await Promise.all([
      /* eslint-disable testing-library/await-fire-event */
      fireEvent.update(isbn, book.isbn),
      fireEvent.update(title, book.title),
      fireEvent.update(authorFirst, book.authorFirst),
      fireEvent.update(authorLast, book.authorLast),
      fireEvent.update(rating, book.rating),
      fireEvent.update(length, book.length),
    ]);

    // save action trigger
    await fireEvent.click(getByRole('button'));
    expect(actions.saveBook).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      book
    );
    expect($router.push).toHaveBeenCalled();
  });
});
