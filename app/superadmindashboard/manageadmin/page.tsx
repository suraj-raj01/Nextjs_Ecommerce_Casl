'use client'
import "../managevendor/style.css"
import React, { useEffect, useState } from 'react'
import getAdmin from "@/app/actions/superadmin/getAdmins"
import Table from "react-bootstrap/Table"
import { AiFillDelete } from "react-icons/ai";
import deleteAdmin from "@/app/actions/superadmin/deleteAdmin"
import activateAdmin from "@/app/actions/superadmin/activeAdmin"
import deActivateAdmin from "@/app/actions/superadmin/deactiveAdmin"
import Button from "react-bootstrap/Button"
import searchVendor from "@/app/actions/admin/searchVendor"
import Modal from 'react-bootstrap/Modal';
import approveProduct from '@/app/actions/admin/approveProduct';
import cancelApproveProduct from '@/app/actions/admin/cancelApproveProduct';
import Image from "next/image"
import Swal from "sweetalert2"

export default function AdminPage() {
  const [mydata, setData] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>([])
  const [status, setStatus] = useState<boolean>(false);
  const [data, setVendorProduct] = useState<any>([]);
  const [searchInput,setSearch] = useState<any>("");

  const [show, setShow] = useState(false);

  const fetchData = async () => {
    const data = await getAdmin();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const delAdmin = (id: number) => {
    deleteAdmin(id);
    Swal.fire({
      title: "Admin Deleted!",
      icon: "success"
    });
    fetchData();
  }

  const activeAdmin = (id: number) => {
    activateAdmin(id)
    Swal.fire({
      title: "Admin Activated!",
      icon: "success"
    });
    fetchData();
  }

  const deactiveAdmin = (id: number) => {
    deActivateAdmin(id)
    Swal.fire({
      title: "Admin De-Activated!",
      icon: "success"
    });
    fetchData();
  }

  const search = async(e:any) => {
    let stdsearch = e.target.value
    setSearch(stdsearch);
    const data = await searchVendor(searchData);
    setSearchData(data?.data || []);
    console.log(data?.data);
    setStatus(true);
  }

  const approve=(id:number)=>{
    approveProduct(id);
  }
  const cancelApprove=(id:number)=>{
    cancelApproveProduct(id);
  }


  return (
    <div>

      <div id='search'>
        <p className="text-2xl font-bold">Admin List</p>
        <form id="search-form" >
          <input type="text" name="search" placeholder="Search vendors" value={searchInput} onChange={search}/>
          <button type="submit" >Search</button>
        </form>
      </div>
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
          {
            mydata.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  {item.status === "pending" ? (
                    <Button size="sm" variant="success" onClick={() => activeAdmin(item.id)}>
                      Activate
                    </Button>
                  ) : (
                    <Button size="sm" variant="warning" onClick={() => deactiveAdmin(item.id)}>
                      Deactivate
                    </Button>
                  )}
                </td>
                <td>
                  <Button size="sm" variant="danger" onClick={() => delAdmin(item.id)}>
                    <span className="flex items-center content-center gap-2">
                      <AiFillDelete /> Delete
                    </span>
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item?.proname}</td>
                  <td>{item?.proprice}{" ₹"}</td>
                  <td>
                    <Image src={item?.proimgurl} alt="pro image" height={40} width={40}/>
                  </td>
                  <td>{item?.approve === "no" ? (
                    <Button size='sm' variant='warning' onClick={() => { approve(item.id) }}>Approve</Button>
                  ) : (
                    <Button size='sm' variant='success' onClick={() => { cancelApprove(item.id) }}>Approved</Button>
                  )}</td>
                </tr>
              ))}
            </tbody>  

          </Table>
        </Modal.Body>
      </Modal>


    </div>
  )
}
