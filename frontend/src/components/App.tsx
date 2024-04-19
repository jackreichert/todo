import '../App.scss';

import TaskInput from './TaskInput/index';
import List from './TaskList/index';

function App() {
  return (
    <>
      <h1 className="font-mono mb-4">Over-Engineered To Do App</h1>
      <TaskInput title="" isEdit={false} />
      <List />
    </>
  );
}

export default App;
