import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useCushook from '../custom hook/Cushook';

const NewTask = (props) => {
  const { isLoading, error, makeRequest: makeTaskRequest } = useCushook();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name;
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    makeTaskRequest(
      {
        url: 'https://react-https-2e5a2-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;