import { FC } from "react";
import classNames from "classnames";
import './button.css'
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes { }


const Button: FC<ButtonProps> = (props) => {
    return <button {...props} className={classNames("buttoncustom-button", props.className)} />
}

export default Button;