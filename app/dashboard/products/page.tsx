'use client';
import { useEffect, useState } from 'react';
import getVendorsProduct from '../../../app/actions/admin/getVendorProduct';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "../insert/style.css";
import { useRouter } from 'next/navigation';
import deleteProduct from '../../../app/actions/deleteProduct';
import Swal from 'sweetalert2';
import Button from "react-bootstrap/Button"
import { useUser } from '@clerk/nextjs';
import searchProduct from '../../actions/searchProduct';

export default function DisplayPage() {
  const [data, setData] = useState<any[]>([]);
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearch] = useState<string>("");
  const [searchData,setSearchData] = useState<any>([])

  const { user } = useUser();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    console.log('User Id:', user?.id);
    setId(user?.id);
  }, []);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setLoading(true);
      return;
    }

    const data = await searchProduct(value);
    setSearchData(data?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true); // Start loading

      try {
        const vendorData = await getVendorsProduct(id);
        console.log('Vendor Data:', vendorData);

        if (vendorData.success && Array.isArray(vendorData.data)) {
          setData(vendorData.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [id]);

  const router = useRouter();
  const editpage = (id: number) => {
    router.push(`/dashboard/editdata/${id}`);
  }

  const deletePro = async (id: number) => {
    await deleteProduct(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deletePro(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  let sno = 0;

  return (
    <div>
      <div className='overflow-y-scroll' style={{ height: '88vh' }}>
        <div className="w-full h-auto p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-xl font-bold text-gray-800">
            <Button variant="success" onClick={() => { router.push("dashboard/addvendor") }}>+ Add Products</Button>

          </div>

          <form id="search-form" className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="search"
              placeholder="Search products"
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
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">SNo</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">Product Title</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Product Image</th>
                <th className="px-4 py-2 border">Approve Status</th>
                <th className="px-4 py-2 border">Update</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    <span className="text-lg font-medium">Loading products...</span>
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border">{++sno}</td>
                    <td className="px-4 py-2 border">{item.proname}</td>
                    <td className="px-4 py-2 border">{item.protitle}</td>
                    <td className="px-4 py-2 border">₹{item.proprice}</td>
                    <td className="px-4 py-2 border">{item.proCategory}</td>
                    <td className="px-4 py-2 border">
                      {item.proimgurl ? (
                        <img
                          src={item.proimgurl}
                          alt="img"
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`font-semibold ${item.approve === "yes" ? "text-green-600" : "text-yellow-600"}`}
                      >
                        {item.approve === "yes" ? "Active" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-2 w-full flex items-center justify-center gap-1">
                      <span
                        onClick={() => deletePro(item.id)}
                        className="text-red-600 px-2 py-1 text-xl rounded w-full flex items-center justify-center gap-1"
                      >
                        <AiFillDelete />
                      </span>
                      <span
                        onClick={() => editpage(item.id)}
                        className="text-green-700 mt-1 px-2 py-1 text-xl rounded w-full flex items-center justify-center gap-1"
                      >
                        <FaEdit />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
              className={`px-3 py-1 border rounded ${currentPage === num + 1 ? 'bg-green-700 text-white' : ''}`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
