// 'use client'
// import React, { useState, FormEvent } from 'react';
// import Form from 'react-bootstrap/Form';
// import { useFormState } from 'react-dom'
// import { productData } from '../../actions/products'

// import "../../admindashboard/insert/style.css"

// // const initialstate={
// //   success:false,
// //   error:""
// // };


// export default function productForm() {
//   const [validated, setValidated] = useState<boolean>(false);
//   // const[state,formAction] = useFormState(productData, initialstate);

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };

//   interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
//     target: HTMLInputElement & { files: FileList };
//   }

//   const onfileChange = (e: FileChangeEvent): void => {
//     let file = e.target.files[0];
//     console.log(file);
//   };

//   return (
//     <>
//       <div id="insertform">
//         <Form noValidate validated={validated} onSubmit={handleSubmit} action={productData}>

//           <h2 className='text-2xs text-center p-2'>Insert Product</h2>

//           <Form.Group controlId="validationCustom01">
//           {/* <Form.Label>Select Category</Form.Label> */}
//           <Form.Select aria-label="Default select example">
//             <option>Select Category</option>
//             <option value="1">Flowers</option>
//             <option value="2">Cakes</option>
//             <option value="3">Plants</option>
//             <option value="3">Personalized</option>
//             <option value="3">New Arrivals</option>
//             <option value="3">Internationals</option>
//             <option value="3">Bulk / Corp Gift</option>
//             <option value="3">Same Day Delivery</option>
//           </Form.Select>
//           </Form.Group>

//           <Form.Group controlId="validationCustom01">
//             {/* <Form.Label>First name</Form.Label> */}
//             <Form.Control
//               required
//               type="text"
//               placeholder="Product Name"
//               name='product'
//             />
//             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group controlId="validationCustom02">
//             {/* <Form.Label>Last name</Form.Label> */}
//             <Form.Control
//               required
//               type="number"
//               placeholder="Product Price"
//               name='price'
//             />
//             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//           </Form.Group>


//           <Form.Group controlId="validationCustom03">
//             <textarea name="details" id="" required
//             placeholder='Product details'>

//             </textarea>
//           </Form.Group>

//           {/* <Form.Group controlId="validationCustom04">
//             <Form.Control type="text" placeholder="State" required 
//             name='name'
//             value={Input}
//             onChange={handleInput}/>
//             <Form.Control.Feedback type="invalid">
//               Please provide a valid state.
//             </Form.Control.Feedback>
//           </Form.Group> */}

//           <Form.Group controlId="validationCustom05">
//             <Form.Label className='font-bold'>Select Image</Form.Label>
//             <Form.Control type="file"  required onChange={onfileChange}/>
//             <Form.Control.Feedback type="invalid">
//               Please provide a valid file.
//             </Form.Control.Feedback>
//           </Form.Group>

//           <button type="submit">Submit form</button>
//         </Form>
//       </div>
//     </>
//   );
// }


// 'use client'
// import { useState } from "react";
// import axios from "axios";
// import createData from "../actions/createData"

// export default function Home() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // try {
//     //   const response = await axios.post("/api/userinfo", {
//     //     title,
//     //     content,
//     //   });
//     //   console.log("Post created:", response.data);
//     //   // Clear form
//     //   setTitle("");
//     //   setContent("");
//     // } catch (error) {
//     //   console.error("Error creating post:", error);
//     // }


//   };

//   return (
//     <div>

//       <form action={createData}  onSubmit={handleSubmit} className="max-w-2/2 bg-gray-400 m-auto p-5">
//         <input
//           type="text"
//           placeholder="your title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           className="p-2 mt-2 border-1"
//         />
//         <br />
//         <textarea
//           placeholder="your content"
//           value={content}
//           onChange={e => setContent(e.target.value)}
//           className="p-2 mt-2 border-1"
//         />
//         <br />
//         <button type="submit" className="p-2 mt-2 border-1">Submit</button>
//       </form>
//     </div>
//   );
// }


"use client"
import "../../admindashboard/insert/style.css"
import { useFormState } from 'react-dom'
import { productData } from '../../actions/products'

const initialstate={
  success:false,
  error:""
};

export default function Form(){
  const[state,formAction] = useFormState(productData, initialstate);
  return (
    <>
    <div id="insertform">
    <form action={formAction} className='flex flex-col items-center p-4'>
      <p className="text-center font-bold text-2xl">Insert Product</p>
      <select name="category" id="" title="Choose a category">
        <option>Select Category</option>
        <option value="Flowers">Flowers</option>
        <option value="Cakes">Cakes</option>
        <option value="Plants">Plants</option>
        <option value="Personalized">Personalized</option>
        <option value="New Arrivals">New Arrivals</option>
        <option value="Internationals">Internationals</option>
        <option value="Bulk / Corp Gift">Bulk / Corp Gift</option>
        <option value="Same Day Delivery">Same Day Delivery</option>
      </select>
      <input type="text" required name="product"  placeholder='Product Name' className='p-2 border-1 mt-2 w-70'/>
      <input type="number" required name="price"  placeholder='Price'  className='p-2 border-1 mt-2 w-70'/>
      <input type="text" required name="details"  placeholder='Details'  className='p-2 border-1 mt-2 w-70'/>
      <input type="file" required placeholder="choose file" className='p-2 border-1 mt-2 w-70'/>
      <button type="submit" className='p-2 border-1 mt-2 w-70'>Submit</button>
    </form>
    </div>
    </>
  )
}