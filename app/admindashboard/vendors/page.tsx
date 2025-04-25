'use client'
import React, { useEffect, useState } from 'react'
import getVendors from '@/app/actions/admin/showVendors'
import Table from "react-bootstrap/Table"
const page = () => {
  const[data,setData] = useState<any>([]);

  const fetchData=async()=>{
    const data = await getVendors();
    setData(data);
    console.log(data);
  }

  useEffect(()=>{
    fetchData();
  },[])

  const res = data.map((key:any)=>{
    return(
      <>
        <tr>
          <td>{key.name}</td>
          <td>{key.email}</td>
          <td>{key.contact}</td>
          <td></td>
        </tr>
      </>
    )
  })

  return (
    <div>
      <h1>Manage Vendors</h1>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
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