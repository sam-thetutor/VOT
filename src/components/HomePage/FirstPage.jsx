import React from 'react'

const FirstPage = ({isNavOpen}) => {
  return (
    <div
            className={`${
              isNavOpen ? 'z-0' : 'z-10'
            }  flex flex-col gap-5 md:gap-0 items-center justify-center md:flex-row md:justify-between xl:pr-20`}
          >
            <div className="md:max-w-[598px] flex flex-col gap-5 tracking-[0.01em]">
              <div className="text-[36px] lg:text-[52px] font-bold leading-[49px] lg:leading-[71px]">
                Redefining how virtual Communities work through{' '}
                <span className="bg-gradient-to-r from-[#5EE616] to-[#209B72] inline-block text-transparent bg-clip-text">
                  DAOs
                </span>{' '}
              </div>
              <div className="lg:text-[22px] text-lg leading-[25px] md:leading-[30px] font-normal">
              Imagine a world where citizens have the power to shape their own destiny, where decisions are made through a transparent and democratic process, and where the collective voice of the community is heard. Welcome to Votarico, a Decentralized Autonomous Country that brings this vision to life.
              </div>
            </div>
            <div className="max-w-[350px] md:max-w-[400px] w-full flex items-center md:justify-end">
              <img
                src="/assets/comm.jpg"
                alt="round"
                className="rounded-full flex shadow-black shadow-xl"
              />
            </div>
          </div>
  )
}

export default FirstPage
