import classNames from "classnames";
import Button from "../../ui/Button/Button";
import { useTelegram } from "../../hooks/useTelegram";

import './header.css'

const Header = () => {
    const { onClose, user } = useTelegram()

    return (
        <div className={classNames('header')}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={classNames('username')}>{
                user?.username
            }</span>
        </div>
    )
}

export default Header;