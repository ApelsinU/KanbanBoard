import './create-card.scss'

interface ICreateCard {
  setIsCreateModalOpen: (isCreateModal: boolean) => void
}

export const CreateCard = ({ setIsCreateModalOpen }: ICreateCard) => {
  return (
    <div className={'create-card'} onClick={() => setIsCreateModalOpen(true)}>
      + New
    </div>
  )
}
