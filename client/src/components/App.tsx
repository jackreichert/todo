
import '../App.scss';
import TaskInput from './TaskInput/index.tsx';
import List from './TaskList/index.tsx';

function App() {
  return (
    <>
      <h1 className="font-mono mb-4">Over-Engineered To Do App</h1>
      <TaskInput />
      <List />
    </>
  );
}

export default App;
