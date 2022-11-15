import classNames from 'classnames/bind';
import styles from './button.module.scss'

const cx = classNames.bind(styles);

function Button({ children, className, success, info, danger, primary, ...passProps}) {
    const classe = cx('btn', className, {
        success,
        info,
        danger,
        primary
    });
    return (
        <button className={classe} {...passProps}>{ children }</button>
    );
}

export default Button;