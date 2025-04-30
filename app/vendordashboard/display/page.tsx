// app/users/page.tsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import getProduct from "../../actions/getProduct"
import Table from "react-bootstrap/Table"
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "../insert/style.css"
import { useRouter } from 'next/navigation';

export default function DisplayPage() {
  const [show, setShow] = useState<any>(false);
  const [data, setData] = useState<any>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    const data = await getProduct();
    setData(data || []);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

   const router=useRouter();
    const editpage=(id:number)=>{
      router.push(`/vendordashboard/editdata/${id}`)
    }

  return (
    <div>
      <div id="tabledata">
        <Table striped hover responsive>
          <thead>
            <tr className='border-1'>
              <th>Product Name</th>
              <th>Product Title</th>
              <th>Price</th>
              {/* <th>Description</th> */}
              <th>Category</th>
              {/* <th>Product Information</th> */}
              <th>Product Image</th>
              <th>Approve Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.proname}</td>
                <td>{item.protitle}</td>
                <td>{item.proprice}</td>
                {/* <td>{item.prodesc}</td> */}
                <td>{item.proCategory}</td>
                {/* <td>{item.proinfo}</td> */}
                <td>
                  {item.proimgurl ? (
                    <Image src={item.proimgurl} alt='img' height={80} width={80} />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  {item.approve==="yes"?(
                    <p className='font-bold ml-2'>Active</p>
                  ):(
                    <p className='font-bold ml-2'>Pending</p>
                  )}
                </td>
                <td>
                  <Button className='ml-2' variant='danger' size='sm'><AiFillDelete /></Button>
                  <br />
                  <Button className='ml-2' variant='success' size='sm' onClick={()=>{editpage(item.id)}}><FaEdit /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
