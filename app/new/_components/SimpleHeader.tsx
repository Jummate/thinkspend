import { Moon } from 'lucide-react'
import React from 'react'

const SimpleHeader = () => {
  return (
    <header className='flex justify-between bg-white items-center p-4 shadow-xs'>
      <h1>ThinkSpend</h1>

      <div>
        <Moon />
      </div>

    </header>
  )
}

export default SimpleHeader
