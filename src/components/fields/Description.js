import styles from './fields.module.scss';

function Description({ description, setDescription }) {
    const emitDescription = (value) => {
        setDescription(value)
    }
    return (
        <div className={`${styles.fieldDescription} ${styles.boxField}`}>
            <h3 className={styles.filedTitle}>Description</h3>
            <textarea 
                value={description}
                onChange={(e)=>emitDescription(e.target.value)} 
                placeholder="Enter your work ..."
            ></textarea>
        </div>
    );
}

export default Description;