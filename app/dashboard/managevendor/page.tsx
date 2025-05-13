'use client'
import "../managevendor/style.css"
import React, { useEffect, useState } from 'react'
import getAllVendors from "../../../app/actions/admin/getAllVendors"
import Table from "react-bootstrap/Table"
import { AiFillDelete } from "react-icons/ai";
import deleteVendor from '../../../app/actions/admin/deleteVendor';
import activateVendor from '../../../app/actions/admin/activateVendor';
import deActivateVendor from '../../../app/actions/admin/deActivateVendor';
import Button from "react-bootstrap/Button"
import searchVendor from "../../../app/actions/admin/searchVendor"
import approveProduct from '../../../app/actions/admin/approveProduct';
import cancelApproveProduct from '../../../app/actions/admin/cancelApproveProduct';
import Image from "next/image"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function VendorsPage() {
  const [mydata, setData] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>([])
  const [status, setStatus] = useState<boolean>(true);
  const [data, setVendorProduct] = useState<any>([]);
  const [searchInput, setSearch] = useState<any>("");

  const [show, setShow] = useState(false);

  const fetchData = async () => {
    const data = await getAllVendors();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const delVendor = (id: number) => {
    deleteVendor(id);
    Swal.fire({
      title: "Vendor Deleted!",
      icon: "success"
    });
    fetchData();
  }

  const activeVendor = (id: number) => {
    activateVendor(id)
    Swal.fire({
      title: "Vendor Activated!",
      icon: "success"
    });
    fetchData();
  }

  const dectiveVendor = (id: number) => {
    deActivateVendor(id)
    Swal.fire({
      title: "Vendor De-Activated!",
      icon: "success"
    });
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

  const approve = (id: number) => {
    approveProduct(id);
  }
  const cancelApprove = (id: number) => {
    cancelApproveProduct(id);
  }

  const router = useRouter();

  const seeProduct=(id:number)=>{
    router.push(`/dashboard/products/${id}`)
  }

let sno=0;
  return (
    <div>

      <div className="w-full h-auto p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-xl font-bold text-gray-800">
          <Link href="/dashboard/addvendor"> Add Vendor </Link>
        </div>

        <form id="search-form" className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="search"
            placeholder="Search vendors"
            value={searchInput}
            onChange={search}
            className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-900 transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="p-2 w-full">
        <Table striped hover responsive>
        <thead>
          <tr>
            <th>SNo</th>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Update</th>
           <th> See Products</th>
          </tr>
        </thead>
        <tbody>
          {
            status ? (
              mydata.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{++sno}</td>
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
                    <Button size="sm" variant="success" onClick={() => { seeProduct(item.id) }}>See Products</Button>
                  </td>
                </tr>
              ))
            ) : (
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
                </tr>
              ))
            )
          }
        </tbody>
      </Table>
      </div>
    </div>
  )
}
