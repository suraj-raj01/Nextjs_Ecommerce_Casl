// app/users/page.tsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import getVendorsProduct from '@/app/actions/admin/getVendorProduct';
import Table from "react-bootstrap/Table"
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "../insert/style.css"
import { useRouter } from 'next/navigation';
import deleteProduct from '@/app/actions/deleteProduct';
import Swal from 'sweetalert2';

const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

export default function DisplayPage() {
  const [data, setData] = useState<any>([]);
  const [id, setId] = useState<any>([]);

  const fetchData = async () => {
    const vendorData = await getVendorsProduct(id);
    if ('data' in vendorData && Array.isArray(vendorData.data)) {
      setData(vendorData.data);
    } else {
      setData([]);
    }
    console.log(vendorData);
  };

  useEffect(() => {
    fetchData();
    setId(localStorage.getItem("id"));
  }, [id]);

  const router = useRouter();
  const editpage = (id: number) => {
    router.push(`/vendordashboard/editdata/${id}`)
  }

  const deletePro = async (id: number) => {
    await deleteProduct(id.toString())
    Swal.fire({
      title: "Please Login First!",
      icon: "warning",
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  let sno=0;

  return (
    <div>
      <div className='overflow-y-scroll' style={{ height: '88vh' }}>
        <Table striped hover responsive>
          <thead>
            <tr className='border-1'>
              <th>SNo</th>
              <th>Product Name</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Product Image</th>
              <th>Approve Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{++sno}</td>
                  <td>{item.proname}</td>
                  <td>{item.protitle}</td>
                  <td>{item.proprice}</td>
                  <td>{item.proCategory}</td>
                  <td>
                    {item.proimgurl ? (
                      <Image src={item.proimgurl} alt='img' height={50} width={50} />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    {item.approve === "yes" ? (
                      <p className='font-bold ml-2'>Active</p>
                    ) : (
                      <p className='font-bold ml-2'>Pending</p>
                    )}
                  </td>
                  <td>
                    <Button className='ml-2' variant='danger' size='sm' onClick={() => { deletePro(item.id) }}><AiFillDelete /></Button>
                    <br />
                    <Button className='ml-2' variant='success' size='sm' onClick={() => { editpage(item.id) }}><FaEdit /></Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="flex justify-center gap-3 space-x-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 border rounded ${currentPage === num + 1 ? 'bg-green-700 text-white' : ''
                }`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
