import styles from './fields.module.scss';

function Piority({ piority, setPiority }) {
    const selectsValue = ['low', 'normal', 'high'];
    const emitPiority = (value) => {
        setPiority(value);
    }
    return (
        <div className={`${styles.fieldPiority} ${styles.boxField}`}>
            <h3 className={styles.filedTitle}>Piority</h3>
            <select onChange={(e)=>emitPiority(e.target.value)} value={piority}>
                {selectsValue.map(pio => (
                    <option 
                        key={pio} 
                        value={pio}
                    >
                        {pio}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Piority;