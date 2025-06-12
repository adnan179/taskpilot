import Hero from '@/domains/home/components/Hero';
import Navbar from '@/domains/home/components/Navbar'
import About from '@/domains/home/components/About';
import Footer from '@/domains/home/components/Footer';
import ReadyToOrganize from '@/domains/home/components/ReadyToOrganize';

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
