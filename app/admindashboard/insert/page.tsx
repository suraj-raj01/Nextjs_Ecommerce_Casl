


"use client"
import "../../admindashboard/insert/style.css"
import { useFormState } from 'react-dom'
import { productData } from '../../actions/products'

const initialstate={
  success: undefined,
  error: ""
};

export default function Form(){
  const[state,formAction] = useFormState(productData, initialstate);
  return (
    <>
    <form action={formAction} id="formdata">
      <div id="main">
      <div id="insertform">
      <div id="box">
      <input type="text" required name="products"  placeholder='Product Name' className='p-2 border-1 mt-2 w-70'/>
      <input type="text" required name="title"  placeholder='Product Title' className='p-2 border-1 mt-2 w-70'/>
      <input type="number" required name="price"  placeholder='Product Price'  className='p-2 border-1 mt-2 w-70'/>
      <textarea name="details" required placeholder="details" rows={4}>

      </textarea>
      </div>

      <div id="box">
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
      <input type="text" required name="proinfo"  placeholder='Product Info' className='p-2 border-1 mt-2 w-70'/>
      <input type="file" name="imgurl" multiple required placeholder="choose file" className='p-2 border-1 mt-2 w-70'/>
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