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
    const data = await getVendors();
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
    alert("Vendor Activated!!")
    fetchData();
  }

  const dectiveVendor = (id: any) => {
    deActivateVendor(id)
    alert("Vendor De-Activated!!")
    fetchData();
  }
  let count = 0;
  const res = mydata.map((key: any) => (

    <tr>
      <td>{++count}</td>
      <td>{key.name}</td>
      <td>{key.email}</td>
      <td>{key.contact}</td>
      <td>
        {key.status === "pending" ? (
          <Button size="sm" variant="success" onClick={() => activeVendor(key.id)}>
            Activate
          </Button>
        ) : (
          <Button size="sm" variant="warning" onClick={() => dectiveVendor(key.id)}>
            Deactivate
          </Button>
        )}
      </td>
      <td>
        <Button size="sm" variant="danger" onClick={() => delVendor(key.id)}>
          <span className="flex items-center content-center gap-2">
            <AiFillDelete /> Delete
          </span>
        </Button>
      </td>
      <td>
        <Button size="sm" variant="success">See Products</Button>
      </td>
    </tr>
  ));


  const search = () => {
    setSearchData(state?.data);
    console.log(state.data);
    console.log(state.message);
    setStatus(true);
  }

  let counter = 0;
  const res1 = searchData.map((key: any) => {

    return (
      <>
        <tr>
          <td>{++counter}</td>
          <td>{key.name}</td>
          <td>{key.email}</td>
          <td>{key.contact}</td>
          <td>{key.status === "pending" ? (
            <Button size='sm' variant='success' onClick={() => { activeVendor(key.id) }}>Activate</Button>
          ) : (
            <Button size='sm' variant='warning' onClick={() => { dectiveVendor(key.id) }}>Deactivate</Button>
          )}</td>
          <td>
            <Button size='sm' variant='danger' onClick={() => { delVendor(key.id) }}><span className='flex items-center content-center gap-2'><AiFillDelete />Delete</span></Button>
          </td>
          <td>
            <Button size='sm' variant='warning'>See Products</Button>
          </td>
        </tr>
      </>
    )
  })

  return (
    <div>

      <div id='search'>
        <p className="text-2xl font-bold">Vendor List</p>
        <form action={formAction} id="search-form" >
          <input type="text" name="search" placeholder="Search vendors" />
          <button type="submit" onClick={search}>Search</button>
        </form>
      </div>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>SNo</th>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Update</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {status ? (
            res1
          ) : (
            res
          )}
        </tbody>
      </Table>
    </div>
  )
}
