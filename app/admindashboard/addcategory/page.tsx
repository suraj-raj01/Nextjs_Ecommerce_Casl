'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import "../categories/style.css"
import { createCategory } from '@/app/actions/categories/createCategory'
import { useFormState } from 'react-dom'

const initialstate={
    success: undefined,
    error: ""
  };

const page = () => {
    const router = useRouter();
    const[state,formAction] = useFormState(createCategory, initialstate);

  return (
    <div>
        <div id='cate-header'>
            <p className='text-2xl font-bold'>Add New Category</p>
            <button className='p-2 bg-green-800 text-white' onClick={()=>{router.push("/admindashboard/categories")}}>Go to Categories</button>
        </div>
        <div>
            <form action={formAction} id="cate-form">
                <input type="text" name='category' placeholder='enter category name' />
                <input type="file" name='cateurl' placeholder='category image' />
                <button>Add Category</button>
            </form>
        </div>
    </div>
  )
}

export default page