'use client'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Table from "react-bootstrap/Table"
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const imageurl = user?.imageUrl;

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  console.log(cartItems);

  return (
    <div>
      <div id="profile-main">
        <div id="profile" className='w-1/4 p-2 mt-4'>
          {imageurl && <Image src={imageurl} alt='profile' height={50} width={50} className='rounded-4xl'/>}
          <p className='font-bold '>{user?.fullName}</p>
          <div id='about'>
            <p>{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <hr/>
        <div id="purchased">
          <Table>      
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Title</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any, index: number) => (
                <tr key={index || null}>
                  <td>{item.proname}</td>
                  <td>{item.protitle}</td>
                  <td>{item.proprice * item.quantity} {"₹"}</td>
                  <td>
                    <Image src={item.proimgurl} alt='proimage' height={50} width={50} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default UserProfile