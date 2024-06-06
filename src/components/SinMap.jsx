import React from 'react'

const Sinmap = ({ milestones }) => {
  return (
    <div className="border flex flex-col md:flex-row bg-[#3B3B3B] justify-evenly items-center shadow-md rounded-lg p-4 w-full h-full">
      <div className=" flex-col justify-center items-center gap-1">
        <h2 className="text-2xl font-bold mb-2">Roadmap</h2>
        <img src="../assets/roadmap.jpeg" alt="logo" className="rounded-lg" />
      </div>
      <div className="w-2/3 pl-4 gap-2 h-full">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="flex flex-row  justify-between items-center py-2"
          >
            <p className="text-lg font-bold">{milestone.title}</p>
            <p className="bg-gradient-to-r from-[#5EE616] to-[#209B72] inline-block text-transparent bg-clip-text">
              {milestone.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sinmap
