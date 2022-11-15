import { useContext } from 'react';
import { ToDoContext } from '../../ToDoContext'
import styles from './fields.module.scss';

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

function DueDate({ dueDate, setDueDate }) {
    const toDoContext = useContext(ToDoContext);
    const { currentDate } = toDoContext;
    const emitDueDate = (value) => {
        setDueDate(value);
    }
    return (
        <div className={`${styles.fieldDueDate} ${styles.boxField}`}>
            <h3 className={styles.filedTitle}>Due Date</h3>
            <input 
                type="date"
                value={formatDate(dueDate)}
                min={formatDate(currentDate)}
                onChange={(e)=>emitDueDate(e.target.value)}
            />
        </div>
    );
}

export default DueDate;