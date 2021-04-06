import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import DeletePage from '@/pages/delete/_isbn.vue';
import AppButton from '@/components/AppButton.vue';
import BookDelete from '@/components/BookDelete.vue';
import { RouterLinkStub } from '@vue/test-utils';

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
  deleteBook: jest.fn(),
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
  BookDelete: {
    template: '<div data-testid="book-delete" />',
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

describe('pages/delete/_isbn.vue', () => {
  it('shows delete form if logged in', () => {
    const { getByTestId } = render(DeletePage, {
      computed: {
        selectedBook: () => book,
        getBookByIsbn: () => () => book,
        isLoggedIn: () => true,
      },
      mocks: { $route },
      store,
      stubs,
    });
    getByTestId('book-delete');
  });

  it('hides delete form if logged out', () => {
    const { queryByTestId } = render(DeletePage, {
      computed: {
        getBookByIsbn: () => () => book,
        isLoggedIn: () => false,
      },
      mocks: { $route },
      store,
      stubs,
    });
    expect(queryByTestId('book-delete')).not.toBeInTheDocument();
  });

  it('shows error if book not found', () => {
    const { getByTestId } = render(DeletePage, {
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

  it('can delete book', async () => {
    const { getByRole } = render(DeletePage, {
      computed: {
        selectedBook: () => book,
        getBookByIsbn: () => () => book,
        isLoggedIn: () => true,
      },
      mocks: { $route, $router },
      store: {
        modules: {
          books: {
            namespaced: true,
            actions,
            state: { books: { selectedBook: book } },
          },
        },
      },
      stubs: {
        AppButton,
        BookDelete,
        NuxtLink: RouterLinkStub,
        BookCard: true,
      },
    });

    // mounted lifecycle hook sets book to ISBN from URL
    expect(actions.setActiveBook).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      book // The book fetched by getBookByIsbn
    );

    // delete action trigger
    await fireEvent.click(getByRole('button'));
    expect(actions.deleteBook).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      book
    );
    expect($router.push).toHaveBeenCalled();
  });
});
