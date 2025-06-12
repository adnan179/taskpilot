import LogoText from "@/components/LogoText";
import SignInForm from '@/domains/siginin/components/SignInForm';

const SignInPage = () => {
  return (
    <div className='flex flex-col gap-6 justify-center items-center w-full min-h-screen'>
      <LogoText />
      <SignInForm />
    </div>
  )
}

export default SignInPage
