import './button.scss'
import {ChangeEvent, ReactNode} from "react";

export interface IButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined
    children: ReactNode
    onClick?: () => void
    disabled?: boolean
}

export const Button = ({type, children, onClick, disabled}:IButtonProps) => {
    return (
        <button className="button" type={type} onClick={onClick} disabled={disabled}>{children}</button>
    )
}