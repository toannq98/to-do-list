import { useContext, useEffect, useState } from 'react';
import { ToDoContext } from '../../ToDoContext'
import TodoItem from './ToDoItem';


function Todos() {
    const toDoContext = useContext(ToDoContext);
    const { currentsTodo, checked, setCurrentsTodo, setIsShowPopup, setChecked, textSearch } = toDoContext;
    const [todoSelect, setTodoSelect] = useState();
    const [activeIndex, setActiveIndex] = useState(1);
    const { todos, setTodos } = toDoContext;
    let todosSort = [];
    const handleCheckTodo = (todo) => {
        setChecked( prev => {
            if (prev.includes(todo.id)) {
                return prev.filter(item => item !== todo.id);
            } else {
                return [...prev, todo.id]
            }
        });
    }
    const handleRemove = (todo) => {
        const index = todos.findIndex(item => item.id === todo.id);
        todos.splice(index, 1);
        setTodos([...todos]);
        localStorage.removeItem('listTodo');
    }
    const handleDetailContent = (todo) => {
        setTodoSelect(todo);
        if(!JSON.stringify(currentsTodo).includes(JSON.stringify(todo))) {
            setCurrentsTodo([...currentsTodo, todo]);
        }
    }
    const handleUpdateTodos = (todo) => {
        const todoCurrent = todos.find(item => item.id === todo.id);
        
        if (todoCurrent) {
            const index = todos.findIndex(todo => todo.id === todoCurrent.id);
            const todoUpdate = { 
                id: todos[index].id,
                name: toDoContext.taskNameUpdate,
                description: toDoContext.descriptionUpdate,
                dueDate: toDoContext.dueDateUpdate,
                piority: toDoContext.piority,
                status: toDoContext.status
            };
            todos[index] = todoUpdate;
            localStorage.setItem('listTodo', JSON.stringify([...todos]));
            setTodos([...todos]);
        }
    }
    useEffect(()=>{
        if (checked.length > 0) {
            setIsShowPopup(true);
        } else {
            setIsShowPopup(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);
    useEffect(()=> {
        const setTodoUpdate = () => {
            const todoCurrent = todos.find(item => item.id === todoSelect.id);
            if (todoCurrent) {
                toDoContext.setTaskNameUpdate(todoCurrent.name);
                toDoContext.setDescriptionUpdate(todoCurrent.description);
                toDoContext.setDueDateUpdate(toDoContext.formatDate(todoCurrent.dueDate));
                toDoContext.setPiorityUpdate(todoCurrent.piority);
                toDoContext.setStatusUpdate(todoCurrent.status);
            }
        }
        if (currentsTodo.length > 0) {
            setTodoUpdate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentsTodo, todoSelect]);
    if (todos) {
        todosSort = [...todos].filter(todo => todo.name.includes(textSearch));
    }
    todosSort.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    const renderTodoList = todosSort.map((todo, index) => {
        const showContent = index === activeIndex ? "show" : "";
        const ariaExpanded = index === activeIndex ? "true" : "false";
        return (
            <TodoItem
                key={todo.id}
                index={index}
                todo={todo}
                showContent={showContent}
                ariaExpanded={ariaExpanded}
                handleUpdateTodos={handleUpdateTodos}
                handleDetailContent={handleDetailContent}
                handleRemove={handleRemove}
                handleCheckTodo={handleCheckTodo}
                onClick={()=>setActiveIndex(index)}
            />
        );
    });
    return (
        <>
            {todos && renderTodoList}
        </>
    );
}

export default Todos;