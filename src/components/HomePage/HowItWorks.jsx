import React from 'react'
import { howwoks } from '../../utils/data';

const HowItWorks = () => {
  return (
    
      <div className="flex w-full flex-col items-center gap-10 capitalize md:gap-20 lg:gap-[100px]">
        <div className="flex w-full flex-col justify-center gap-10 px-[15px] text-white md:px-0 lg:gap-[60px]">
          <div className=" flex flex-col justify-start text-start sm:pl-0 lg:gap-2.5">
            <div className="text-[28px] font-semibold leading-[39px] lg:text-[38px] lg:leading-[45px] items-center justify-center w-full flex">
              How it works
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-[20px] sm:flex-row">
            {howwoks.map((data, index) => {
              return (
                <div
                  key={index}
                  className=" flex max-h-fit w-full items-center gap-5 rounded-[20px] p-5 sm:h-[337px] sm:flex-col sm:justify-center sm:p-0 md:max-w-[330px] lg:h-[439px]"
                >
                  <div>
                    <img
                      src={data.img}
                      alt="img"
                      className="h-[100px] min-w-[100px] sm:h-[150px] lg:h-auto"
                    />
                  </div>
                  <div className="flex w-full max-w-[155px] flex-col gap-2.5 text-start sm:text-center md:max-w-[170px] lg:max-w-[270px]">
                    <div className="text-base font-semibold leading-[30px] lg:text-[22px]">
                      {data.title}
                    </div>
                    <div className="bg-gradient-to-r from-[#5EE616] to-[#209B72] inline-block text-transparent bg-clip-text p-3">
                      {data.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        
        </div>
      </div>
  
  )
}

export default HowItWorks
