import { useContext} from 'react';
import { ToDoContext } from '../../ToDoContext'
import styles from './fields.module.scss';

function Name({ taskName, setTaskName }) {
    const toDoContext = useContext(ToDoContext);
    const { requiredName, setRequiredName } = toDoContext;
    const emitName = (value) => {
        setTaskName(value)
    }
    return (
        <div className={`${styles.fieldName} ${styles.boxField}`}>
            <input 
                value={taskName}
                onChange={(e)=>emitName(e.target.value)} 
                onFocus={()=>setRequiredName(false)}
                onBlur={()=>setRequiredName(true)}
                type="text" 
                placeholder="Add new task ..." 
            />
            {requiredName && <span className="required">Field required (*)</span>}
        </div>
    );
}

export default Name;