import { createContext } from 'react';

import { AppContextType } from '@/types';

const AppContext = createContext<AppContextType>({
  tasks: [{ title: '', status: false }],
  setTasks: () => {
    // intentionally empty
  },
});

export default AppContext;
