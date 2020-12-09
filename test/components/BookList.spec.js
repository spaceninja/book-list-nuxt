import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import BookList from '@/components/BookList.vue';
import { RouterLinkStub } from '@vue/test-utils';

const books = {
  1: {
    title: 'Book Title',
    authorFirst: 'John',
    authorLast: 'Doe',
    rating: 5,
    length: 1,
    isbn: '123',
  },
  2: {
    title: 'Another Book Title',
    authorFirst: 'Bob',
    authorLast: 'Dobbs',
    rating: 1,
    length: 5,
    isbn: '456',
  },
};

describe('BookList.vue', () => {
  it('renders book list', () => {
    const { getAllByTestId } = render(BookList, {
      computed: { allBooks: () => books, isLoggedIn: () => false },
      stubs: {
        BookCard: {
          template: '<div data-testid="book-card" />',
        },
      },
    });
    expect(getAllByTestId('book-card')[0]).toHaveAttribute(
      'title',
      books[1].title
    );
  });

  it('shows error if there are no books', () => {
    const { getByText } = render(BookList, {
      computed: { allBooks: () => {}, isLoggedIn: () => false },
      stubs: ['Alert'],
    });
    getByText(/There are no books/);
  });

  it('displays add book link when logged in', () => {
    const { getByText } = render(BookList, {
      computed: { allBooks: () => {}, isLoggedIn: () => true },
      stubs: { Alert: true, NuxtLink: RouterLinkStub },
    });
    getByText('Add Book');
  });

  it('hides add book link when logged out', () => {
    const { queryByText } = render(BookList, {
      computed: { allBooks: () => {}, isLoggedIn: () => false },
      stubs: ['Alert'],
    });
    expect(queryByText('Add Book')).not.toBeInTheDocument();
  });
});
