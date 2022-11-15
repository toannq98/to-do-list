import './App.scss';
import { useContext } from 'react';
import { ToDoContext } from './ToDoContext'
import Button from './components/Button';
import Description from './components/fields/Description';
import DueDate from './components/fields/DueDate';
import Name from './components/fields/Name';
import Piority from './components/fields/Piority';
import Search from './components/Search';
import Status from './components/fields/Status';
import Todos from './components/Todos';

function App() {
  const toDoContext = useContext(ToDoContext);
  const { todos, checked, taskName, setTodos, setRequiredName, clearForm } = toDoContext;
  const handleAddTodo = () => {
    if (taskName.trim() !== '') {
      const todo = {
        id: `${todos.length + 1}`,
        name: toDoContext.taskName,
        description: toDoContext.description,
        dueDate: toDoContext.dueDate,
        piority: toDoContext.piority,
        status: toDoContext.status
      }
      setTodos([...todos, todo]);
      localStorage.setItem('listTodo', JSON.stringify([...todos, todo]));
      clearForm();
      setRequiredName(false);
    } else {
      setRequiredName(true);
    }
  }
  const handleRemoveCheck = () => {
    const results = todos.filter(todo => !checked.includes(todo.id));
    localStorage.setItem('listTodo', JSON.stringify([...results]));
    setTodos([...results]);
  }

  return (
    <div className="App">
      <div className="new-tast">
        <h2 className="main-title">New Task</h2>
        <div className="main-content">
          <Name
            taskName={toDoContext.taskName}
            setTaskName={toDoContext.setTaskName}
          />
          <Description
            description={toDoContext.description}
            setDescription={toDoContext.setDescription}
          />
          <DueDate
            dueDate={toDoContext.dueDate}
            setDueDate={toDoContext.setDueDate}
          />
          <Piority
            piority={toDoContext.piority}
            setPiority={toDoContext.setPiority}
          />
          <Status
            status={toDoContext.status}
            setStatus={toDoContext.setStatus}
          />
          <Button 
            success 
            className="btn-add"
            onClick={handleAddTodo}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="to-do-list">
        <h2 className="main-title">To Do List</h2>
        <Search />
        <Todos />
        <div className={`popup ${toDoContext.isShowPopup ? 'show' : ''}`}>
          <div className="popup-text">
            <p>Bulk Action:</p>
          </div>
          <div className="popup-button">
            <Button primary>Done</Button>
            <Button onClick={handleRemoveCheck} danger>Remove</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
