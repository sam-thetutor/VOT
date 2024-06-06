import { useState } from 'react'
import { TiTick } from 'react-icons/ti'
import { GoArrowDownRight } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";
export const navitem = [
  'Home',
  'Marketplace',
  'Community Bank',
  'TownHall',
  'About',
]
export const howwoks = [
  {
    img: 'https://www.tailwindtap.com/assets/crypto/workicon1.png',
    title: 'Citizenship',
    desc: 'Purchase a temporarly Visa or permanet Citizenship to enter into the land of Votarico',
  },
  {
    img: 'https://www.tailwindtap.com/assets/crypto/workicon1.png',
    title: 'Claim Tokens',
    desc: 'Receive a daily VOT token allocation to cover your food bills and weekly allocation to cover insurance and medical bills',
  },
  {
    img: 'https://www.tailwindtap.com/assets/crypto/workicon1.png',
    title: 'Governance',
    desc: 'Your vote and voice matters. Vote for your favorite leaders as well as contest in different leadership positions',
  },
  {
    img: 'https://www.tailwindtap.com/assets/crypto/workicon1.png',
    title: 'Economy',
    desc: 'Trade assets with other citizens to generate and accumulate more wealth',
  },
]

export const accData = [
  {
    title: "How to buy VOT tokens?",
    content:
      'As of now, VOT token is not listed on any exchange, and the only way to get it is to become a citizen of Votarico',
  },
  {
    title: 'How to buy Visa to join Votarico',
    content:
      'You can buy a temporarly or permanent visa when you login to our site. we are in the final touches and will open the site to everyone',
  },
  {
    title: 'What do I benefit from becoming a citizen of Votarico?',
    content:
      'As a citizen, you will be able to claim your free daily and weekly VOT tokens. You can vote on proposals to shape the future of Votarico. You automatically also access to the community marketplace and bank where you can participate to multiply your wealth',
  },
]

export const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded((current) => !current)
  return (
    <div
      className="w-full cursor-pointer bg-transparent text-lg text-white shadow-sm"
      onClick={toggleExpanded}
    >
      <div className="flex h-16 select-none flex-row items-center justify-between text-left md:h-16">
        <h5 className="flex-1 text-sm font-normal leading-tight sm:text-lg md:text-lg">
          {title}
        </h5>
        <div className="flex h-6 w-6 items-center justify-center rounded-full">
          {expanded ? '-' : '+'}
        </div>
      </div>
      <div
        className={`overflow-hidden pt-0 transition-[max-height] duration-500 ease-in ${
          expanded ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <p className="pb-4 text-left font-normal tracking-[0.01em] opacity-60 leading-[28px]">
          {content}
        </p>
      </div>
    </div>
  )
}

export const dropDownData = [
  {
    title: 'June 2024',
    description: [
      {
        task: 'Project started',
        isDone: true,
      },
      {
        task: 'Landing page for the project',
        isDone: true,
      },

      {
        task: 'Backend code for Visa and Citizenship purchase',
        isDone: true,
      },
      {
        task: 'Backend code to allow citizens to claim daily and weekly VOT tokens',
        isDone: true,
      },
      {
        task: 'Backend code to allow citizens to create, and vote on proposals',
        isDone: false,
      },
      {
        task: 'Frontend for the project',
        isDone: false,
      },
    ],
  },
  {
    title: 'July 2024',
    description: [
      {
        task: 'Add Townhall for where citizens can discuss and contribute to different topics',
        isDone: false,
      },
      {
        task: '',
        isDone: false,
      },
    ],
  },
  {
    title: 'August 2024',
    description: [
      {
        task: 'Develop the community marketplace feature',
        isDone: false,
      },
      {
        task: 'Release the community marketplace feature',
        isDone: false,
      },
      {
        task: 'Token listing on icpSwap,ICPExchange and Sonic',
        isDone: false,
      },
      {
        task: 'Token listing on other exchanges and DexScreener',
        isDone: false,
      },

    ],
  },
  {
    title: 'September 2024',
    description: [
      {
        task: 'Developing the Community Bank feature',
        isDone: false,
      },
      {
        task: 'Releasing the Community Bank feature',
        isDone: false,
      },
    ],
  },
]

export const DropDown = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded((current) => !current)
  return (
    <div
      className="w-full cursor-pointer bg-transparent py-8 px-7 gap-3"
      onClick={toggleExpanded}
    >
      <div className="flex  flex-row items-center justify-between text-left gap-3">
        <h5 className="flex-1 text-lg sm:text-2xl font-medium ">{title}</h5>
        <div className="flex items-center justify-center rounded-full">
          {
            expanded?<GoArrowUpRight/>:<GoArrowDownRight/>
          }
          
        </div>
      </div>
      <div
        className={`overflow-hidden pt-0 transition-[max-height] duration-500 ease-in ${
          expanded ? 'max-h-40' : 'max-h-1'
        }`}
      >
        <div className="pb-4 text-left sm:text-xl font-normal text-sm overflow-y-auto h-[150px] ">
          {content.map((cont, index) => {
            return (
              <div key={index} className='flex gap-8 mt-2 items-center'>
                <span>
                  {cont.task}
                </span>
                <span>{<TiTick color={cont.isDone ? "green" : "gray"}/>}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
