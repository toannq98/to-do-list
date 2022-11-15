import { useState, useEffect, createContext } from 'react';

const ToDoContext = createContext();

const currentDate = new Date();
const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}

function ToDoProvider({ children }) {

    const [todos, setTodos] = useState();
    const [checked, setChecked] = useState([]);
    const [textSearch, setTextSearch] = useState('');
    const [requiredName, setRequiredName] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(formatDate(currentDate));
    const [piority, setPiority] = useState('normal');
    const [status, setStatus] = useState(false);

    const [taskNameUpdate, setTaskNameUpdate] = useState('');
    const [descriptionUpdate, setDescriptionUpdate] = useState('');
    const [dueDateUpdate, setDueDateUpdate] = useState(formatDate(currentDate));
    const [piorityUpdate, setPiorityUpdate] = useState('normal');
    const [statusUpdate, setStatusUpdate] = useState(false);
    const [currentsTodo, setCurrentsTodo] = useState([]);
    const clearForm = () => {
        setTaskName('');
        setDescription('');
        setDueDate(formatDate(currentDate));
        setPiority('normal');
        setStatus(false);
    }
    const value = {
        todos,
        checked,
        isShowPopup,
        textSearch,
        currentDate,
        currentsTodo,
        requiredName,
        taskName,
        description,
        dueDate,
        piority,
        status,
        taskNameUpdate,
        descriptionUpdate,
        dueDateUpdate,
        piorityUpdate,
        statusUpdate,
        setRequiredName,
        setTextSearch,
        setIsShowPopup,
        setChecked,
        setCurrentsTodo,
        setTodos,
        clearForm,
        setTaskName,
        setDescription,
        setDueDate,
        setPiority,
        setStatus,
        setTaskNameUpdate,
        setDescriptionUpdate,
        setDueDateUpdate,
        setPiorityUpdate,
        setStatusUpdate,
        formatDate,
    }
    useEffect(()=> {
        let listTodo = [];
        if (JSON.parse(localStorage.getItem('listTodo')) !== null) {
            listTodo = JSON.parse(localStorage.getItem('listTodo'));
        } else {
            listTodo = [
                {
                    id: '1',
                    name: 'Do homework',
                    description: 'Do homework description',
                    dueDate: '2022-11-17',
                    piority: 'normal',
                    status: false
                },
                {
                    id: '2',
                    name: 'Do housework',
                    description: 'Do housework description',
                    dueDate: '2022-11-18',
                    piority: 'low',
                    status: true
                },
                {
                    id: '3',
                    name: 'Learn something',
                    description: 'Learn something description',
                    dueDate: '2022-11-16',
                    piority: 'hight',
                    status: false
                },
            ];
            localStorage.setItem('listTodo', JSON.stringify(listTodo));
        }
        setTodos([...listTodo]);
    }, [])

    return (
        <>
            {<ToDoContext.Provider value={value}>
                {children}
            </ToDoContext.Provider>}
        </>
        
    )
}
export { ToDoContext, ToDoProvider }