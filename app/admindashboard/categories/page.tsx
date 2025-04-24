'use client'
import React, { useEffect, useState } from 'react'
import "../categories/style.css"
import { useRouter } from 'next/navigation'
import getCategory from '@/app/actions/categories/getCategory'
import updateCategory from '@/app/actions/categories/updateCategory'
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Table from "react-bootstrap/Table"
import Image from 'next/image'
const page = () => {
  const [category, setCategory] = useState<any>([])

  const router = useRouter();

  const fetchData = async () => {
    const data = await getCategory();
    setCategory(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem=(id:any)=>{
      updateCategory(id)
      fetchData()
      alert("data delete success")
    }

  const editItem=(id:any)=>{
    alert(id)
  }

  const res = category.map((key:any)=>{
    return(
      <>
      <tr>
        <td>{key.catename}</td>
        <td>
          <Image src={key.cateurl} alt='cateimage' height={50} width={50}/>
        </td>
        <td >
          <button onClick={()=>{deleteItem(key.id)}} className='text-center p-2 bg-green-900 text-white'><AiFillDelete /></button>
        </td>
        <td >
         <button onClick={()=>{editItem(key.id)}}><FaEdit /></button>
        </td>
      </tr>
      </>
    )
  })
  return (
    <div>
      <div id='cate-header'>
        <p className='text-2xl font-bold'>Categories</p>
        <button onClick={() => { router.push("/admindashboard/addcategory") }} 
          className='bg-green-800 p-2 text-white'
          >Add Category</button>
      </div>
      <Table striped hover responsive>
        <thead>
          <tr className='border-1 p-2'>
            <th>Category Name</th>
            <th>Category URL</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {res}
        </tbody>
      </Table>
    </div>
  )
}

export default page