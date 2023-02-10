import './input.scss'

interface IInput {
  type: string
}

export const Input = ({ type }: IInput) => {
  return <input className={'input-container'} type={type} />
}
