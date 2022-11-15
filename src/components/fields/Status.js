import styles from './fields.module.scss';

function Description({ status, setStatus }) {
    const emitStatus = (value) => {
        setStatus(value);
    }
    return (
        <div className={`${styles.fieldStatus} ${styles.boxField}`}>
            <h3 className={styles.filedTitle}>Status</h3>
            <select onChange={(e)=>emitStatus(e.target.value)} value={status}>
                <option value={false}>Doing</option>
                <option value={true}>Done</option>
            </select>
        </div>
    );
}

export default Description;