import React from 'react'
import {accData,Accordion} from "../../utils/data"
const FAQs = () => {
  return (
    <div>
        <div className="flex flex-col justify-center items-center gap-5 px-5 lg:px-52 mb-12">
            <h1 className="text-[32px] font-semibold leading-[48px]">FAQs</h1>
            <div className="text-center font-normal text-lg mb-5">
            Below is a list of our FAQs</div>
            <div className="mx-auto flex w-full flex-col items-center justify-center">
              <div className="h-[2px] w-full"></div>
              {accData.map((acc, index) => {
                return (
                  <div className="w-full" key={index}>
                    <Accordion title={acc.title} content={acc.content} />
                  </div>
                );
              })}
            </div>
          </div>
      
    </div>
  )
}

export default FAQs
