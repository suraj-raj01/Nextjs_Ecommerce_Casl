// app/users/page.tsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import getProduct from "../../actions/getProduct"
import Table from "react-bootstrap/Table"
import { MdDelete } from "react-icons/md";
import deleteProduct from '@/app/actions/deleteProduct';

export default function DisplayPage() {
  const [show, setShow] = useState<any>(false);
  const [data1,setData] = useState<any>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    const data = await getProduct();
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem=(id:any)=>{
    deleteProduct(id);
    fetchData();
  }

  let sno=0;
  const res = data1.map((key:any,index:number)=>{
    return(
      <>
      <tr key={key.id || index}>
        <td>{++sno}</td>
        <td>{key.proname}</td>
        <td>{key.protitle}</td>
        <td>{key.proprice}</td>
        <td>{key.proCategory}</td>
        <td>
          <Image src={key.proimgurl} alt='img' height={50} width={50}/>
        </td>
        <td>
        <Button size='sm' variant='danger'><span onClick={()=>{deleteItem(key.id)}} className='flex items-center content-center gap-1'><MdDelete />Delete</span></Button>
        </td>
      </tr>
      </>
    )
  })

  return (
    <div>
      <Table striped hover responsive>
        <thead>
          <tr className='border-1'>
            <th>SNo</th>
            <th>Product Name</th>
            <th>Product Title</th>
            <th>Price</th>
            {/* <th>Description</th> */}
            <th>Category</th>
            {/* <th>Product Information</th> */}
            <th>Category Image</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
         {res}
        </tbody>
      </Table>
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
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Product Price"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Details"
                autoFocus
              />
            </Form.Group>
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
