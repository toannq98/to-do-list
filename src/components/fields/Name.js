import { useContext, useState } from 'react';
import { ToDoContext } from '../../ToDoContext'
import styles from './fields.module.scss';

function Name({ taskName, setTaskName, type }) {
    const toDoContext = useContext(ToDoContext);
    const { requiredName, setRequiredName } = toDoContext;
    const [requiredNameUpdate, setRequiredNameUpdate] = useState(false);
    const emitName = (value) => {
        setTaskName(value)
    }
    const handleBlurName = () => {
        if (taskName.trim() === '') {
            setRequiredName(true);
        } else {
            setRequiredName(false);
        }
    }
    const handleBlurNameUpdate = () => {
        if (taskName.trim() === '') {
            setRequiredNameUpdate(true);
        } else {
            setRequiredNameUpdate(false);
        }
    }
    return (
        <div className={`${styles.fieldName} ${styles.boxField}`}>
            {type === 'new' ? (
                <>
                    <input 
                        value={taskName}
                        onChange={(e)=>emitName(e.target.value)} 
                        onFocus={()=>setRequiredName(false)}
                        onBlur={handleBlurName}
                        type="text" 
                        placeholder="Add new task ..." 
                    />
                    {requiredName && <span className="required">Field required (*)</span>}
                </>
            ) : (
                <>
                    <input 
                        value={taskName}
                        onChange={(e)=>emitName(e.target.value)} 
                        onFocus={()=>setRequiredNameUpdate(false)}
                        onBlur={handleBlurNameUpdate}
                        type="text" 
                        placeholder="Add new task ..." 
                    />
                    {requiredNameUpdate && <span className="required">Field required (*)</span>}
                </>
            )}
            
        </div>
    );
}

export default Name;