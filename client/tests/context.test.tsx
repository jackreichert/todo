import {
  useContext, useEffect, useState, useMemo,
} from 'react';
import '@testing-library/jest-dom';
import { describe } from 'vitest';
import { render } from '@testing-library/react';

import AppContext from '../src/context';
import { TaskType } from '../src/types';

function Task() {
  const { tasks } = useContext(AppContext);
  return (
    <li>
      {tasks[0].title}
      {' '}
      <input type="checkbox" checked={tasks[0].status} />
    </li>
  );
}

function MockApp() {
  const singleTask: TaskType[] = [{ title: 'first task', status: true }];
  const [tasks, setTasks] = useState<TaskType[]>(singleTask);
  const contextValues = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);

  useEffect(() => {
    setTasks([{ title: 'updated task', status: false }]);
  }, []);

  return (
    <AppContext.Provider value={contextValues}>
      <Task />
    </AppContext.Provider>
  );
}

describe('AppContext', () => {
  it('contains task objects', () => {
    const wrapper = render(<MockApp />);
    expect(wrapper.getByText(/updated task/i)).toBeInTheDocument();
    expect(wrapper.getByRole('checkbox')).not.toBeChecked();
  });
});
