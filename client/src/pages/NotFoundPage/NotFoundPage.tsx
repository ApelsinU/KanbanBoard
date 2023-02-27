import './not-found-page.scss'
import { Button } from '@App/ui/Button/Button'

export const NotFoundPage = () => {
  return (
    <div className="container no-split">
      <div className="not-found-page">
        <h1>Page Not Found</h1>
        <div className="text-container">
          <p>We search everywhere, but can't find anything :( </p>
          <p>
            Please, check if your <span className={'text-bg'}>Url</span> correct
          </p>
        </div>
        <p>or</p>
        <Button url="/" text={'Contact Us'} height={45} />
      </div>
    </div>
  )
}
