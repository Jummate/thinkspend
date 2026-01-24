import React from 'react'
import { FaBoltLightning } from 'react-icons/fa6'

const NaturalLangInputForm = () => {
  return (
    <form >
             <div className="p-3 bg-secondary/50 my-4 rounded-lg flex flex-col gap-3">
          <input
            type="text"
            name=""
            className="w-full"
          />
          <button
            type="button"
            className="flex items-center justify-center gap-1 cursor-pointer self-end bg-primary hover:bg-primary-dark rounded-lg px-4 py-1 text-white"
          >
            <span className="font-bold">Parse</span>{" "}
            <FaBoltLightning size={15} />
          </button>
        </div>
    </form>
  )
}

export default NaturalLangInputForm
