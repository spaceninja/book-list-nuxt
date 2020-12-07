import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import BookDelete from '@/components/BookDelete.vue';
import { RouterLinkStub } from '@vue/test-utils';

const book = {
  title: 'Book Title',
  authorFirst: 'John',
  authorLast: 'Doe',
  rating: 5,
  length: 1,
  isbn: '123',
};

const stubs = {
  BookCard: {
    template: '<div data-testid="book-card" />',
  },
  NuxtLink: RouterLinkStub,
};

describe('BookDelete.vue', () => {
  it('renders book content', () => {
    const { getByTestId } = render(BookDelete, {
      computed: { book: () => book },
      stubs,
    });
    expect(getByTestId('book-card')).toHaveAttribute('title', book.title);
  });

  it('emits delete event when clicked', async () => {
    const { getByRole, emitted } = render(BookDelete, {
      computed: { book: () => book },
      stubs,
    });
    await fireEvent.click(getByRole('button'));
    expect(emitted('delete'));
  });
});
