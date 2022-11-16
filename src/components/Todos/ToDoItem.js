import classNames from 'classnames/bind';
import { useContext, useRef, useState } from 'react';
import { ToDoContext } from '../../ToDoContext'
import Button from '../Button';
import Description from '../fields/Description';
import DueDate from '../fields/DueDate';
import Name from '../fields/Name';
import Piority from '../fields/Piority';
import Status from '../fields/Status';
import styles from './todo.module.scss'


const cx = classNames.bind(styles);

function TodoItem({ 
    todo,
    handleUpdateTodos,
    handleDetailContent,
    handleCheckTodo,
    ariaExpanded,
    showContent,
    index,
    onClick,
    handleRemove
}) {
    const toDoContext = useContext(ToDoContext);
    const [toggleContent, setToggleContent] = useState(false);
    const [heightContent, setHeightContent] = useState('0');
    const contentEl = useRef();
    const handleShowDetail = (todo) => {
        onClick();
        setToggleContent(true);
        handleDetailContent(todo);
        setHeightContent(`${contentEl.current.scrollHeight}px`);
    }
    const handleHidenContent = () => {
        onClick();
        setToggleContent(false);
        setHeightContent(`0`);
    }
    const selectTodo = (todo) => {
        handleCheckTodo(todo);
    }
    return (
        <div className={cx("box")}>
            <div className={cx("title", { done: todo.status})}>
                <div className={cx("name")}>
                    <label className={cx("custom-checkbox")}>
                        <span className={cx("text")}>{todo.name}</span>
                        <input type="checkbox" onChange={()=>selectTodo(todo)}/>
                        <span className={cx("checkmark")}></span>
                    </label>
                </div>
                <div className={cx("action")}>
                    {toggleContent && showContent !== '' ? (
                        <Button
                            info
                            className="btn-action"
                            aria-expanded="false"
                            onClick={handleHidenContent}
                        >
                            close
                        </Button>
                    ) : (
                        <Button 
                            info
                            className="btn-action"
                            aria-expanded={ariaExpanded}
                            onClick={()=>handleShowDetail(todo)}
                            aria-controls={`todo-${index + 1}_desc`}
                        >
                            Detail
                        </Button> 
                    )}
                    
                    <Button
                        danger
                        className="btn-action"
                        onClick={()=>handleRemove(todo)}
                    >
                        Remove
                    </Button>
                </div>
            </div>
            <div
                id={`todo-${index + 1}_desc`}
                className={cx('content', `${toggleContent ? showContent : ''}`)}
            >
                <div
                    className={cx("content-inner")}
                    ref={contentEl}
                    style={{maxHeight: `${showContent !== '' ? heightContent : '0'}`}}
                >
                    <Name
                        type="list"
                        taskName={toDoContext.taskNameUpdate}
                        setTaskName={toDoContext.setTaskNameUpdate}
                    />
                    <Description
                        description={toDoContext.descriptionUpdate}
                        setDescription={toDoContext.setDescriptionUpdate}
                    />
                    <DueDate
                        dueDate={toDoContext.dueDateUpdate}
                        setDueDate={toDoContext.setDueDateUpdate}
                    />
                    <Piority
                        piority={toDoContext.piorityUpdate}
                        setPiority={toDoContext.setPiorityUpdate}
                    />
                    <Status
                        status={toDoContext.statusUpdate}
                        setStatus={toDoContext.setStatusUpdate}
                    />
                    <Button
                        success
                        className="btn-update"
                        onClick={()=>handleUpdateTodos(todo)}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;