"use client"
import "../../../admindashboard/insert/style.css"
import editProduct from "@/app/actions/editProduct";
import { useState, useRef, ChangeEvent, useEffect, startTransition } from 'react';
import getCategory from "../../../../app/actions/categories/getCategory";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const initialstate = {
  success: undefined as boolean | undefined,
  error: "",
  data: undefined
};

export default function Form() {
  const id = localStorage.getItem('id');
  const productData = {}; // Define productData with an appropriate structure
  const [state, setState] = useState(initialstate);

  const formAction = (formData: any) => {
    setState({ ...state, success: true, data: formData });
  };
  const [image, setImage] = useState<string | null>(null);
  const [formdata, setFormData] = useState<any>(null);
  const [cateData, setCategory] = useState<any>([]);
  const [editData,setEditData] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const params = useParams();
    const formdataid = params.id ? Number(params.id) : undefined;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCategories = async () => {
    const response = await getCategory();
    if (Array.isArray(response)) {
      setCategory([]);
    } else {
      setCategory(response.data || []);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      const formData = new FormData(event.currentTarget);
      formData.append('id', id as string);
      formAction(formData);
      setFormData(null);
    });
  };

  useEffect(() => {
    if (state.success) {
      setFormData(null);
      alert('Data inserted successfully!');
    }
  }, [state.success]);

  const formDataLoad=async()=>{
    if (formdataid !== undefined) {
      const data = await editProduct(formdataid);
      setEditData(data);
      console.log(data);
    } else {
      console.error("formdataid is undefined");
    }
  }

  useEffect(() => {
    formDataLoad();
    getCategories();
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit} id="formdata">
        <div id="main">
          <div id="insertform">
            <div id="box">
              <input value={editData?.users?.proname} type="text" required name="products" placeholder='Product Name' className='p-2 border-1 mt-2 w-70' />
              <input value={editData?.users?.protitle} type="text" required name="title" placeholder='Product Title' className='p-2 border-1 mt-2 w-70' />
              <input value={editData?.users?.proprice} type="number" required name="price" placeholder='Product Price' className='p-2 border-1 mt-2 w-70' />
              <textarea value={editData?.users?.prodesc} name="details" required placeholder="details" rows={4}>

              </textarea>
            </div>

            <div id="box">
              <select name="category" value={editData?.users?.catename}  id="" title="Choose a category">
                <option value={editData?.users?.prodesc}>{editData?.users?.prodesc}</option>
                {cateData.map((item: any, index: number) => (
                  <option key={index} value={item.catename}>{item.catename}</option>
                ))}
              </select>

              <select name="sameday" value={editData?.users?.sameday} id="" title="Same Day Delivery">
                <option value={editData?.users?.sameday}>{editData?.users?.samedaydelivery}</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <select name="type" value={editData?.users?.type} id="" title="Product Type">
                <option value={editData?.users?.type}>{editData?.users?.type}</option>
                <option value="Birthday Gift">Birthday Gift</option>
                <option value="Aniversary Gift">Aniversary Gift</option>
                <option value="International">International</option>
                <option value="Plants">Plants</option>
                <option value="Personalized">Personalized</option>
                <option value="Gift Flower">Gift Flower</option>
              </select>

              <textarea required name="proinfo" value={editData?.users?.proinfo} placeholder='Product Info' className='p-2 border-1 mt-2 w-70' >

              </textarea>
              <input type="file" name="imgurl" multiple required placeholder="choose file" className='p-2 border-1 mt-2 w-70' onChange={handleFileChange} />
              {image && (
                <div>
                  <span onClick={handleRemoveImage} className="cursor-pointer text-red-500">X</span>
                  <Image src={image} alt="Selected Image" width={30} height={30} />
                </div>
              )}
            </div>

          </div>
        </div>
        <div id="btn">
          <button type="submit" className='p-2 border-1 mt-2 w-70'>Submit</button>
        </div>
      </form>
    </>
  )
}