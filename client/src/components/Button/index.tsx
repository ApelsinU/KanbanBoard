import './button.scss'

export interface IButtonProps {
    type: 'button' | 'submit' | 'reset' | undefined
    text: string
}

export const Button = ({type, text = ''}:IButtonProps) => {
    return (
        <button className="button" type={type}>{text}</button>
    )
}