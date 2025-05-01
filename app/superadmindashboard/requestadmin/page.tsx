
'use client'
import "../managevendor/style.css"
import React, { useEffect, useState } from 'react'
import adminRequest from "@/app/actions/superadmin/adminRequest"
import Table from "react-bootstrap/Table"
import { AiFillDelete } from "react-icons/ai";
import deleteAdmin from "@/app/actions/superadmin/deleteAdmin"
import activateAdmin from "@/app/actions/superadmin/activeAdmin"
import deActivateAdmin from "@/app/actions/superadmin/deactiveAdmin"
import Button from "react-bootstrap/Button"


export default function AdminPage() {
  const [mydata, setData] = useState<any>([]);


  const fetchData = async () => {
    const data = await adminRequest();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const delAdmin = (id: any) => {
    deleteAdmin(id);
    alert("Vendor deleted!!!")
    fetchData();
  }

  const activeAdmin = (id: any) => {
    activateAdmin(id)
    alert("Admin Activated!!")
    fetchData();
  }

  const deactiveAdmin = (id: any) => {
    deActivateAdmin(id)
    alert("Admin De-Activated!!")
    fetchData();
  }

  // const search = () => {
  //   setSearchData(state?.data);
  //   console.log(state.data);
  //   console.log(state.message);
  //   setStatus(true);
  // }



  return (
    <div>

      <div id='search'>
        <p className="text-2xl font-bold">Admin Request List</p>
        <form  id="search-form" >
          <input type="text" name="search" placeholder="Search vendors" />
          <button type="submit">Search</button>
        </form>
      </div>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Request</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {
            mydata.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.status === "pending" ? (
                  <Button size='sm' variant='success' onClick={() => { activeAdmin(item.id) }}>Confirm</Button>
                ) : (
                  <Button size='sm' variant='warning' onClick={() => { deactiveAdmin(item.id) }}>Deactivate</Button>
                )}</td>
                <td>
                  <Button size='sm' variant='danger' onClick={() => { delAdmin(item.id) }}><span className='flex items-center content-center gap-2'><AiFillDelete />Delete</span></Button>
                </td>
              </tr>
            ))
          
            }
        </tbody>
      </Table>
    </div>
  )
}
