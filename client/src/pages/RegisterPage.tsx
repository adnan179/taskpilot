import LogoText from '../components/LogoText'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className='flex flex-col gap-6 justify-center items-center w-full min-h-screen'>
      <LogoText />
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
