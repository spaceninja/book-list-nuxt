import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Alert from '@/components/Alert.vue';

describe('Alert.vue', () => {
  it('renders slot content', () => {
    const msg = 'This is an Alert!';
    const container = render(Alert, {
      slots: { default: msg },
    });
    container.getByText(msg);
  });

  it('renders an error', () => {
    const msg = 'This is an Error!';
    const container = render(Alert, {
      slots: { default: msg },
      props: { isError: true },
    });
    const alert = container.getByText(msg);
    expect(alert).toHaveClass('alert--error');
  });
});
