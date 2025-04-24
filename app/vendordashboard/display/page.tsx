// app/users/page.tsx
'use client';
import Image from 'next/image';
import getProduct from '../../actions/getProduct';
import deleteProduct from '@/app/actions/deleteProduct';
import editProduct from '@/app/actions/editProduct';
import getOneProduct from '@/app/actions/getOneProduct';

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function DisplayPage() {
  const [products, setProducts] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [data1,setData] = useState<any>({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    const data = await getProduct();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const deleteItem=(id:any)=>{
    deleteProduct(id)
    alert("data delete success")
    fetchData()
  }
  
  const loadOneData=async(id: any)=>{
     const data = await getOneProduct(id);
     setData(data);
     console.log(data);
  }
  const editItem=(id:any)=>{
    editProduct(id);
    handleShow();
    fetchData();
  }

  useEffect(()=>{
    const defaultId = products.length > 0 ? products[0].id : null; // Replace with a valid default ID
    if (defaultId) {
      loadOneData(defaultId);
    }
  },[products])


  return (
    <div>
      <table className='border-1'>
        <thead>
          <tr className='border-1'>
            <th className='border-1 p-2.5  bg-gray-400 text-white' >Product Name</th>
            <th className='border-1 p-2.5  bg-gray-400 text-white' >Price</th>
            <th className='border-1 p-2.5  bg-gray-400 text-white' >Product Details</th>
            <th className='border-1 p-2.5  bg-gray-400 text-white' >Image</th>
            <th className='border-1 p-2.5  bg-gray-400 text-white'>Update</th>
          </tr>
        </thead>
        <tbody>
          {products.map((key: any, index: number) => (
            <tr key={index} className='border-1'>
              <td>{key.proname}</td>
              <td>{key.proprice}</td>
              <td>{key.prodetails}</td>
              <td>
                <Image
                  src={key.proimgurl} // or external URL
                  alt="Product Image"
                  width={200}
                  height={200}
                />
              </td>
              <td>
                <button onClick={() => {deleteItem(key.id)}}
                 className='font-bold bg-red-400 p-2'  
                >delete</button>
                <br />
                <button onClick={() => {editItem(key.id)}}
                 className='font-bold bg-red-400 p-2'  
                >Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Product Name"
                autoFocus
                value={data1.proname}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Product Price"
                autoFocus
                value={data1.proprice}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Details"
                autoFocus
                value={data1.prodetails}
              />
            </Form.Group>

            <Image src={data1.proimgurl} alt='proimage' height={300} width={300}/>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
