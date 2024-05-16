import { afterAll, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/naming-convention
const originalVITE_REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

vi.mock('@/utils', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../src/utils')>();
  return {
    ...mod,
    // replace some exports
    fetchLists: vi.fn(() => Promise.resolve([{ id: 'mock_id', title: 'default list' }])),
    createTask: vi.fn((taskData) => Promise.resolve({ title: taskData.title, completed: false })),
    fetchTasks: vi.fn(() => Promise.resolve([{ id: 'mock_id', title: 'default task', completed: false }])),
  };
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.env.VITE_REACT_APP_API_URL = originalVITE_REACT_APP_API_URL;
});
