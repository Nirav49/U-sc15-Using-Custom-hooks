import React, { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useCushook from './components/custom hook/Cushook';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, makeRequest: getTasks } = useCushook();

  useEffect(() => {
    const convertTasks = (task) => {
      const loadedTasks = [];

      for (const taskKey in task) {
        loadedTasks.push({ id: taskKey, text: task[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    getTasks(
      { url: 'https://react-https-2e5a2-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json' },
      convertTasks
    );
  }, [getTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={getTasks}
      />
    </React.Fragment>
  );
}

export default App;