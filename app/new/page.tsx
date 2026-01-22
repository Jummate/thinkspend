import { ArrowLeft, Check, CheckCircle2, CloudLightning } from 'lucide-react'
import React from 'react'

const AddNewExpensePage = () => {
  return (
    <div className='flex-1 max-w-2xl mx-auto py-5 px-4'>
      <div className='flex gap-2 text-muted-foreground'>
        <ArrowLeft />
        <span>Back to Dashboard</span>
      </div>

      <header className='leading-relaxed mt-5'>
        <h1 className='font-bold text-foreground'>Add Expense AI</h1>
        <p className='text-muted-foreground text-sm'>Simply type what you spent and let AI do the work.</p>
      </header>

      <section className='bg-white p-5 mt-10 rounded-lg shadow-xs'>
        <p className='text-xs text-muted-foreground/60 font-bold'>NATURAL LANGUAGE INPUT</p>
        <div className='p-3 bg-secondary/50 my-4 rounded-lg flex flex-col gap-3'>
          <input type="text" className='w-full'/>
          <button type='button' className='flex items-center justify-center gap-1 self-end bg-primary rounded-lg px-4 py-1 text-white'>Parse <CloudLightning size={15} /> </button>
        </div>
        <p className='italic text-muted-foreground text-xs'>Try "Lunch #1000", "Uber #12000", "Bought groceries #15500" </p>

      </section>

      <section className='mt-10'>
        <div className='flex mb-4 gap-2 items-center'><span>AI Detected Details</span> <small className='flex items-center text-category-groceries bg-category-groceries/20 font-bold text-xs p-1 rounded-lg'><CheckCircle2 size={10} className=''/> PARSED</small></div>

        <form className='flex flex-col gap-3'>
          <div className='flex gap-4'>
            <div className='flex flex-col flex-1'>
              <label htmlFor="" className='mb-2 text-muted-foreground text-sm'>Amount</label>
              <input type="text" className='border border-muted-foreground/30 rounded-lg p-1 bg-white px-3 font-bold outline-none focus:shadow-sm focus:ring-1 focus:ring-primary text-sm'/>

            </div>
           <div className='flex flex-col flex-1'>
              <label htmlFor="" className='mb-2 text-muted-foreground text-sm'>Category</label>
              <select className='border border-muted-foreground/30 rounded-lg p-1 bg-white px-3 outline-none focus:shadow-sm focus:ring-1 focus:ring-primary'>
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>
              </select>

            </div>
          
          </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='mb-2 text-muted-foreground text-sm'>Description</label>
              <input type="text" className='border border-muted-foreground/30 rounded-lg p-1 bg-white px-3 font-bold outline-none focus:shadow-sm focus:ring-1 focus:ring-primary text-sm'/>

            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='mb-2 text-muted-foreground text-sm'>Date</label>
              <input type="date" className='border border-muted-foreground/30 rounded-lg p-1 bg-white px-3 outline-none focus:shadow-sm focus:ring-1 focus:ring-primary text-sm'/>

            </div>

            <button type='button' className='flex items-center justify-center gap-1 self-start bg-primary rounded-lg px-6 py-2 text-white mt-4'>Save Expense <Check size={15} /> </button>

            
        </form>
      </section>
    </div>
  )
}

export default AddNewExpensePage
