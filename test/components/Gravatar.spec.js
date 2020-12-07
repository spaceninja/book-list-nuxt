import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Gravatar from '@/components/Gravatar.vue';

describe('Gravatar.vue', () => {
  it('renders a gravatar', () => {
    const { getByRole } = render(Gravatar, {
      props: { email: 'test@example.com' },
    });
    expect(getByRole('img')).toHaveAttribute(
      'src',
      'https://www.gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0'
    );
  });
});
