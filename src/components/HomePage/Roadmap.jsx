import React, { useState } from 'react'
import SinMap from '../../components/SinMap'
import { dropDownData,DropDown } from '../../utils/data'

const Roadmap = () => {
  
  const [milestones, setMilestones] = useState([
    {
      title: 'Q2 2024: Token Listing',
      description:
        'We will list our token on major cryptocurrency exchanges, making it easier for users to buy and sell our token.',
    },
    {
      title: 'Q3 2024: Mainnet Launch',
      description:
        'We will launch our mainnet, enabling the use of our token for transactions and smart contracts.',
    },
    {
      title: 'Q4 2024: DApp Development',
      description:
        'We will develop decentralized applications (DApps) that utilize our token and provide additional functionality to users.',
    },
  ])
  return (
    <div className="flex w-full flex-col items-center gap-10  md:gap-20 lg:gap-[100px]">
      <div className="flex w-full flex-col justify-center gap-10 px-[15px]  md:px-0 lg:gap-[60px]">
        <div className="flex w-full max-w-[1050px] flex-col items-center justify-center gap-[20px] sm:flex-row">
          <div className="sm:px-20 px-8  flex flex-col gap-9 max-w-screen-xl w-full">
            <div className="flex flex-col gap-7 items-center">
              <span className="text-[28px] font-semibold leading-[39px] lg:text-[38px] lg:leading-[45px] items-center justify-center w-full flex">
                Roadmap
              </span>
              <span className="text-md font-normal text-center">
                Take a look at the current and future progress on the development of Votarico.
              </span>
            </div>
            {dropDownData.map((acc, index) => {
              return (
                <div key={index} className="py-1">
                  <div className="w-full bg-gradient-to-r from-[#5EE616] to-[#209B72] px-[1px] 2xl:px-0.5 2xl:py-0.5 py-[1px] rounded-2xl ">
                    <div className=" h-full w-full bg-[#050C24] rounded-2xl">
                      <DropDown title={acc.title} content={acc.description} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roadmap
