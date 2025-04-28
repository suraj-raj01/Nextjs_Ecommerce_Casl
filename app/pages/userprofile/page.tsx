'use client'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Table from "react-bootstrap/Table"
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cartSlice';
import { clearCart } from '../../store/cartSlice';
import { incrementQuantity, decrementQuantity } from '../../store/cartSlice';
import "../userprofile/style.css"
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const imageurl = user?.imageUrl;

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  console.log(cartItems);
  const dispatch = useDispatch();
  const removeItm = (id: any) => {
    dispatch(
      removeFromCart(id)
    )
  }
  const router = useRouter();

  const clearCartItem = () => {
    dispatch(clearCart())
  }
  let price = 0;
  const res = cartItems.map((key: any) => {
    price += Number(key.proprice * key.quantity);
    return (
      <>
        <tr>
          <td>{key.proname}</td>
          <td>{key.protitle}</td>
          <td>{key.proprice * key.quantity} {"₹"}</td>
          <td>
            <Image src={key.proimgurl} alt='proimage' height={50} width={50} />
          </td>
          {/* <td>
            <span className='flex items-center content-center gap-3'>
              <FaMinusCircle onClick={() => dispatch(decrementQuantity(key.id))} />
              {key.quantity}
              <FaPlusCircle onClick={() => dispatch(incrementQuantity(key.id))} />
            </span>
          </td>
          <td><Button size='sm' variant='danger' onClick={() => { removeItm(key.id) }}>remove</Button></td> */}
        </tr>
      </>
    )
  })


  return (
    <div>
      <div id="main">
        <div id="profile">
          {imageurl && <Image src={imageurl} alt='profile' height={50} width={50} />}
          <p className='font-bold '>{user?.fullName}</p>
          <div id='about'>
            <p>{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <div id="purchased">
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Title</th>
                <th>Price</th>
                <th>Image</th>
                {/* <th>Quantity</th>
                <th>Remove</th> */}
              </tr>
            </thead>
            <tbody>
              {res}
            </tbody>
          </Table>
      <div id='clrbtn'>
        {/* <Button size='sm' variant='success' onClick={() => { router.push("/pages/checkout") }}>CheckOut</Button> */}
        {/* <Button size='sm' variant='danger' onClick={clearCartItem} >Clear Cart</Button> */}
        <Button size='sm' variant='' ><span className='font-bold text-2xl'>Total Price : {price}</span></Button>
      </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile