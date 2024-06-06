import React, { useEffect, useState } from 'react'
import '@fontsource-variable/inter'
import { howwoks, navitem, accData, Accordion } from '../utils/data'
import Footer from './HomePage/Footer'
import FAQs from './HomePage/FAQs'
import Roadmap from './HomePage/Roadmap'
import HowItWorks from './HomePage/HowItWorks'
import OurStory from './HomePage/OurStory'
import Navbar from './HomePage/Navbar'
import FirstPage from './HomePage/FirstPage'

const index = () => {
  const [toggle, setToggle] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const toggleClass = () => {
    setIsNavOpen(!isNavOpen)
    const closeAfterClick = document.querySelector('#nav-icon4')
    closeAfterClick?.classList?.toggle('open')
  }
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      if (scrollTop > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className="bg-[#050C24] font-interfont">
      <div className="relative mx-auto pt-6 flex flex-col items-center justify-center text-[#D2DADF] bg-[url('https://www.tailwindtap.com/assets/nft/infynft/gradient.svg')] bg-cover">
        <div className="absolute top-0 opacity-10 w-full">
          <img
            src="/assets/nft/infynft/back.png"
            alt="backimg"
            className="mx-auto"
          />
        </div>
        <Navbar toggle={toggle} isScrolled={isScrolled} toggleClass={toggleClass} setToggle={setToggle} />

        <div className="flex w-full md:max-w-[1120px] flex-col gap-10 md:gap-20 px-5 xl:px-0">
          {/* top section */}
          <FirstPage isNavOpen={isNavOpen} />
          <OurStory isNavOpen={isNavOpen} />
          <HowItWorks />
          <Roadmap />
          <FAQs />
        </div>
          <Footer />
      </div>
    </div>
  )
}

export default index
