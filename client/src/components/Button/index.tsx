import './button.scss'

export interface IButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined
    text: string
    onClick?: () => void
}

export const Button = ({type, text = '', onClick}:IButtonProps) => {
    return (
        <button className="button" type={type} onClick={onClick}>{text}</button>
    )
}