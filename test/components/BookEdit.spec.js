import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import BookEdit from '@/components/BookEdit.vue';
jest.mock('vuex-map-fields', () => ({
  getterType: jest.fn(),
  mapFields: jest.fn(),
}));

const book = {
  title: 'Book Title',
  authorFirst: 'John',
  authorLast: 'Doe',
  rating: 5,
  length: 1,
  isbn: '123',
};

const computed = {
  title: () => book.title,
  authorFirst: () => book.authorFirst,
  authorLast: () => book.authorLast,
  rating: () => book.rating,
  length: () => book.length,
  isbn: () => book.isbn,
};

const stubs = {
  FormInput: {
    template: '<div data-testid="form-input" />',
  },
};

describe('BookEdit.vue', () => {
  it('will not save with an empty form', async () => {
    const { getByRole, emitted } = render(BookEdit, { stubs });
    await fireEvent.click(getByRole('button'));
    expect(emitted().save).toBeFalsy();
  });

  it('displays a blank form when no book is passed in', () => {
    const { getByText, getAllByTestId } = render(BookEdit, { stubs });
    getByText('Add Book');
    expect(getAllByTestId('form-input')[0]).not.toHaveAttribute('value');
  });

  it('displays an edit form when a book is passed in', () => {
    const { getByText, getAllByTestId } = render(BookEdit, {
      computed,
      stubs,
    });
    getByText('Edit Book');
    expect(getAllByTestId('form-input')[0]).toHaveAttribute(
      'value',
      book.title
    );
  });

  it('emits save event when save button is clicked', async () => {
    const { getByRole, emitted } = render(BookEdit, {
      computed,
      stubs,
    });
    await fireEvent.click(getByRole('button'));
    expect(emitted().save).toBeTruthy();
  });
});
