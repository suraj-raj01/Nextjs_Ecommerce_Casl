'use client'
import "../vendors/style.css"
import React, { useEffect, useState } from 'react'
import vendorRequest from "@/app/actions/admin/vendorsRequest"
import Table from "react-bootstrap/Table"
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import deleteVendor from '@/app/actions/admin/deleteVendor';
import activateVendor from '@/app/actions/admin/activateVendor';
import deActivateVendor from '@/app/actions/admin/deActivateVendor';
import Button from "react-bootstrap/Button"

import searchVendor from "@/app/actions/admin/searchVendor"
import { count } from "console"


const initialstate = {
  success: false,
  message: "",
  data: []
};

export default function VendorsPage() {
  const [mydata, setData] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>([])
  const [state, formAction] = React.useActionState(searchVendor, initialstate)
  const [status, setStatus] = useState<boolean>(true);


  const fetchData = async () => {
    const data = await vendorRequest();
    setData(data);
  }

  useEffect(() => {
    fetchData();
    setStatus(false);
  }, [])

  const delVendor = (id: any) => {
    deleteVendor(id);
    alert("Vendor deleted!!!")
    fetchData();
  }

  const activeVendor = (id: any) => {
    activateVendor(id)
    alert("Vendor conformed!!")
    fetchData();
  }

  const dectiveVendor = (id: any) => {
    deActivateVendor(id)
    alert("Vendor De-Activated!!")
    fetchData();
  }

  const search = () => {
    setSearchData(state?.data);
    console.log(state.data);
    console.log(state.message);
    setStatus(true);
  }



  return (
    <div>

      <div id='search'>
        <p className="text-2xl font-bold">Vendor Request List</p>
        <form action={formAction} id="search-form" >
          <input type="text" name="search" placeholder="Search vendors" />
          <button type="submit" onClick={search}>Search</button>
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
                  <Button size='sm' variant='success' onClick={() => { activeVendor(item.id) }}>Confirm</Button>
                ) : (
                  <Button size='sm' variant='warning' onClick={() => { dectiveVendor(item.id) }}>Deactivate</Button>
                )}</td>
                <td>
                  <Button size='sm' variant='danger' onClick={() => { delVendor(item.id) }}><span className='flex items-center content-center gap-2'><AiFillDelete />Delete</span></Button>
                </td>
              </tr>
            ))
          
            }
        </tbody>
      </Table>
    </div>
  )
}
