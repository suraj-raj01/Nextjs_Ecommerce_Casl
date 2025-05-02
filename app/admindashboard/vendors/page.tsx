'use client'
import "../vendors/style.css"
import React, { useEffect, useState } from 'react'
import getVendors from '@/app/actions/admin/showVendors'
import Table from "react-bootstrap/Table"
import { AiFillDelete } from "react-icons/ai";
import deleteVendor from '@/app/actions/admin/deleteVendor';
import activateVendor from '@/app/actions/admin/activateVendor';
import deActivateVendor from '@/app/actions/admin/deActivateVendor';
import Button from "react-bootstrap/Button"
import getVendorsProduct from "@/app/actions/admin/getVendorProduct"
import searchVendor from "@/app/actions/admin/searchVendor"
import Modal from 'react-bootstrap/Modal';
import approveProduct from '@/app/actions/admin/approveProduct';
import cancelApproveProduct from '@/app/actions/admin/cancelApproveProduct';
import Image from "next/image"

export default function VendorsPage() {
  const [mydata, setData] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>([])
  const [status, setStatus] = useState<boolean>(true);
  const [data, setVendorProduct] = useState<any>([]);
  const [searchInput,setSearch] = useState<any>("");

  const [show, setShow] = useState(false);

  const fetchData = async () => {
    const data = await getVendors();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const delVendor = (id: number) => {
    deleteVendor(id);
    alert("Vendor deleted!!!")
    fetchData();
  }

  const activeVendor = (id: number) => {
    activateVendor(id)
    alert("Vendor Activated!!")
    fetchData();
  }

  const dectiveVendor = (id: number) => {
    deActivateVendor(id)
    alert("Vendor De-Activated!!")
    fetchData();
  }

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  
    if (value.trim() === "") {
      setStatus(true); 
      return;
    }
  
    const data = await searchVendor(value);
    setSearchData(data?.data || []);
    setStatus(false);
  };
  


  const vendorProduct = async (id: number) => {
    const vendorData = await getVendorsProduct(id);
    if ('data' in vendorData && Array.isArray(vendorData.data)) {
      setVendorProduct(vendorData.data);
    } else {
      setVendorProduct([]);
    }
    console.log(vendorData);
    setShow(true)
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
        <p className="text-2xl font-bold">Vendor List</p>
        <form id="search-form" >
          <input type="text" name="search" placeholder="Search vendors" value={searchInput} onChange={search}/>
          <button type="submit" onSubmit={(e) => e.preventDefault()}>Search</button>
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
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {
           status?(
            mydata.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  {item.status === "pending" ? (
                    <Button size="sm" variant="success" onClick={() => activeVendor(item.id)}>
                      Activate
                    </Button>
                  ) : (
                    <Button size="sm" variant="warning" onClick={() => dectiveVendor(item.id)}>
                      Deactivate
                    </Button>
                  )}
                </td>
                <td>
                  <Button size="sm" variant="danger" onClick={() => delVendor(item.id)}>
                    <span className="flex items-center content-center gap-2">
                      <AiFillDelete /> Delete
                    </span>
                  </Button>
                </td>
                <td>
                  <Button size="sm" variant="success" onClick={() => { vendorProduct(item.id) }}>See Products</Button>
                </td>
              </tr>
            ))
           ):(
            searchData.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  {item.status === "pending" ? (
                    <Button size="sm" variant="success" onClick={() => activeVendor(item.id)}>
                      Activate
                    </Button>
                  ) : (
                    <Button size="sm" variant="warning" onClick={() => dectiveVendor(item.id)}>
                      Deactivate
                    </Button>
                  )}
                </td>
                <td>
                  <Button size="sm" variant="danger" onClick={() => delVendor(item.id)}>
                    <span className="flex items-center content-center gap-2">
                      <AiFillDelete /> Delete
                    </span>
                  </Button>
                </td>
                <td>
                  <Button size="sm" variant="success" onClick={() => { vendorProduct(item.id) }}>See Products</Button>
                </td>
              </tr>
            ))
           )
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
