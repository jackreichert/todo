import { createContext } from 'react';

import { AppContextType } from '@/types';

const AppContext = createContext<AppContextType>({
  tasks: [{ title: '', completed: false }],
  setTasks: () => {
    // intentionally empty
  },
  lists: [{ id: '', title: '' }],
  setLists: () => {
    // intentionally empty
  },
  defaultList: '',
  setDefaultList: () => {
    // intentionally empty
  },
});

export default AppContext;
