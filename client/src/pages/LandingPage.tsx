import Hero from '@/components/home/Hero';
import Navbar from '../components/home/Navbar'
import About from '@/components/home/About';
import Footer from '@/components/home/Footer';
import ReadyToOrganize from '@/components/home/ReadyTOOrganize';

const LandingPage = () => {
  return (
    <div className='bg-[#F6F5FF]'>
      <Navbar />
      <div className='px-10 md:px-16'>
        <Hero />
        <About />
        <ReadyToOrganize />
      </div>
      <Footer/>
    </div>
  )
}

export default LandingPage;
