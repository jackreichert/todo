import { createContext } from 'react';
import { AppContextType } from './types.ts';

const AppContext = createContext<AppContextType>({
  tasks: [{ title: '', status: false }],
  setTasks: () => {
    // intentionally empty
  },
  loadingTasks: false,
});

export default AppContext;
