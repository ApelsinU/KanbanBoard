import './registration.scss'

import { RegistrationFooter } from '@App/pages/Registration/components/RegistrationFooter/RegistrationFooter'
import { RegistrationForm } from '@App/pages/Registration/components/RegistrationForm/RegistrationForm'
import { RegistrationHeader } from '@App/pages/Registration/components/RegistrationHeader/RegistrationHeader'

export const Registration = () => {
  return (
    <div className="registration-container">
      <div className="registration">
        <RegistrationHeader />
        <RegistrationForm />
        <RegistrationFooter />
      </div>
    </div>
  )
}
