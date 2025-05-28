import ForgotPassword from '../components/ForgotPassword.jsx'
import SignInForm from '../components/SignIn.jsx'
import SignUp from '../components/SignUp.jsx'
import AnimalProfile from './AnimalProfile.jsx'

const About = () => {
  return (
    <div>
      <AnimalProfile />
      <SignInForm />
      <SignUp />
      <ForgotPassword />
    </div>
  )
}

export default About
