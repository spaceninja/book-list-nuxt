import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Alert from '@/components/Alert.vue';

const slotContent = 'This is an Alert!';

describe('Alert.vue', () => {
  it('renders slot content', () => {
    const { getByText } = render(Alert, {
      slots: { default: slotContent },
    });
    getByText(slotContent);
  });

  it('renders an error', () => {
    const { getByText } = render(Alert, {
      slots: { default: slotContent },
      props: { isError: true },
    });
    expect(getByText(slotContent)).toHaveClass('alert--error');
  });
});
