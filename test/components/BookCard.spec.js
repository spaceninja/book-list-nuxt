import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import AppButton from '@/components/AppButton.vue';
import BookCard from '@/components/BookCard.vue';
import { RouterLinkStub } from '@vue/test-utils';

const book = {
  title: 'Book Title',
  authorFirst: 'John',
  authorLast: 'Doe',
  rating: 5,
  length: 1,
  isbn: '123',
};

describe('BookCard.vue', () => {
  it('renders book content', () => {
    const { getByText } = render(BookCard, {
      props: book,
      computed: { isLoggedIn: () => false },
    });
    getByText(book.title);
  });

  it('hides controls if logged out', () => {
    const { queryByText } = render(BookCard, {
      props: book,
      computed: { isLoggedIn: () => false },
    });
    expect(queryByText('✏️')).not.toBeInTheDocument();
  });

  it('hides controls if logged in but not editable', () => {
    const { queryByText } = render(BookCard, {
      props: book,
      computed: { isLoggedIn: () => true },
    });
    expect(queryByText('✏️')).not.toBeInTheDocument();
  });

  it('shows controls if logged in and editable', () => {
    const { getByText } = render(BookCard, {
      props: { ...book, isEditable: true },
      computed: { isLoggedIn: () => true },
      stubs: { AppButton, NuxtLink: RouterLinkStub },
    });
    getByText('✏️');
  });
});
