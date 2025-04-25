'use client'
import "../vendors/style.css"
import React, { useEffect, useState } from 'react'
import getVendors from '@/app/actions/admin/showVendors'
import Table from "react-bootstrap/Table"
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import deleteVendor from '@/app/actions/admin/deleteVendor';
import activateVendor from '@/app/actions/admin/activateVendor';
import deActivateVendor from '@/app/actions/admin/deActivateVendor';
import { useFormState } from 'react-dom'
import Button from "react-bootstrap/Button"

import searchVendor from "@/app/actions/admin/searchVendor"


const initialstate={
  success: false,
  error: ""
};

export default function VendorsPage() {
  const[data,setData] = useState<any>([]);
  const[searchData,setSearchData] = useState<any>([])
  const[state,formAction] = useFormState(searchVendor,initialstate)

  console.log(state)
  
  const fetchData=async()=>{
    const data = await getVendors();
    setData(data);
    console.log(data);
  }

  useEffect(()=>{
    fetchData();
  },[])

  const delVendor=(id:any)=>{
    deleteVendor(id);
    fetchData();
    alert("Vendor deleted!!!")
  }

  const activeVendor=(id:any)=>{
    activateVendor(id)
    fetchData();
    alert("Vendor Activated!!")
  }

  const dectiveVendor=(id:any)=>{
    deActivateVendor(id)
    fetchData();
    alert("Vendor De-Activated!!")
  }
  
  const res = data.map((key:any)=>{

    return(
      <>
        <tr>
          <td>{key.name}</td>
          <td>{key.email}</td>
          <td>{key.contact}</td>
          <td>{key.status==="pending"?(
              <Button size='sm' variant='success' onClick={()=>{activeVendor(key.id)}}>Activate</Button>
          ):(
              <Button size='sm' variant='warning' onClick={()=>{dectiveVendor(key.id)}}>Deactivate</Button>
          )}</td>
          <td>
        <Button size='sm' variant='danger' ><span className='flex items-center content-center gap-2'><AiFillDelete onClick={()=>{delVendor(key.id)}}/>Delete</span></Button>
          </td>
        </tr>
      </>
    )
  })
  

  return (
    <div>

      <div id='search'>
      <form action={formAction} id="search-form" >
      <input type="text" name="search" placeholder="Search vendors"/>
      <button type="submit">Search</button>
      </form>
      </div>

      {/* <h1>Manage Vendors</h1> */}
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {res}
        </tbody>
      </Table>
    </div>
  )
}
