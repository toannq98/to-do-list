import { useContext} from 'react';
import { ToDoContext } from '../../ToDoContext'
import classNames from 'classnames/bind';
import styles from './search.module.scss'

const cx = classNames.bind(styles);

function Search() {
    const toDoContext = useContext(ToDoContext);
    const { search, setTextSearch } = toDoContext;
    return (
        <div className={cx("box")}>
            <input
                value={search}
                onChange={(e)=>setTextSearch(e.target.value)}
                type="text"
                placeholder="Search ..." 
            />
        </div>
    );
}

export default Search;