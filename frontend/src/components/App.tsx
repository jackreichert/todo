import '../App.scss';

import TaskInput from './TaskInput/index';
import List from './TaskList/index';

function App() {
  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="font-mono text-2xl mb-4 text-center">Over-Engineered To Do App</h1>
          <TaskInput title="" isEdit={false} />
          <List />
        </div>
      </div>
    </div>
  );
}

export default App;
