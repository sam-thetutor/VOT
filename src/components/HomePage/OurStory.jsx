import React from 'react'

const OurStory = ({ isNavOpen }) => {
  return (
    <div
      className={`${
        isNavOpen ? 'z-0' : 'z-10'
      }  flex flex-col gap-5 md:gap-0  items-center justify-center md:justify-between   xl:pr-20`}
    >
      <div className="text-[28px] mt-4 font-semibold leading-[39px] lg:text-[38px] lg:leading-[45px] items-center justify-center w-full flex">
        About Votarico
      </div>
      <div className="shadow-green-300 rounded-lg shadow-md p-6 flex flex-col gap-5 tracking-[0.01em] m-6">
        <div className="lg:text-[22px] text-lg leading-[25px] md:leading-[30px] font-normal">
          Votarico is a Decentralized Autonomous Country powered the DAO
          architecture. To become a citizen, users have to either purchase
          either a temporarly Visa that grants them access to the country for a
          limited time, or a permanent Citizenship that grants them access to
          the country forever.
        </div>
        <div className="lg:text-[22px] text-lg leading-[25px] md:leading-[30px] font-normal">
          VOT is more than just a token; it is a symbol of the collective voice
          of a community. In a society where citizens have the power to shape
          their own destiny, VOT serves as the medium of exchange for voting on
          proposals that shape the future of Votarico.
        </div>

        <div className="lg:text-[22px] text-lg leading-[25px] md:leading-[30px] font-normal">
          Each day, VOT tokens are minted and distributed to all its citizens.
          Each citizen receives an equal amount of VOT tokens on a daily basis
          to cater for their food bills and on a weekly basis to cater for their
          insurance and medical bills. Only citizens are eligible for these
          priviledges. That means that the only way to get VOT tokens is to
          become a citizen, there wont be a private or presale for VOT.
        </div>

        <div className="lg:text-[22px] text-lg leading-[25px] md:leading-[30px] font-normal">
          Votarico has two main economic activities that users can take part in.
          A marketplace where citizens can manufacture,buy and sell their
          products, as well as a community bank where citizens can get loans as
          well as provide loans to those who need them in order to earn some
          interest.
        </div>
        {/* <div>
                <button className="hover:border-white hover:border  border border-transparent flex items-center gap-2 rounded px-3 py-2.5 text-sm font-semibold bg-gradient-to-r from-green-500 via-green-500 to-teal-500 text-white">
                  Explore Now
                  <img src="" alt="arrow image" className='rounded-full flex' />
                </button>
              </div> */}
      </div>
    </div>
  )
}

export default OurStory
