import { test } from 'vitest';
import assert from 'assert';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import AppProvider from '../src/AppProvider';

test('renders AppProvider without crashing', async () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  await act(async () => {
    root.render(<AppProvider />);
  });

  await act(async () => {
    root.unmount();
  });
});

test('renders root element', async () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  await act(async () => {
    root.render(<AppProvider />);
  });

  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

  const rootElement = div.querySelector('[data-testid="root"]');
  assert(rootElement);
});
