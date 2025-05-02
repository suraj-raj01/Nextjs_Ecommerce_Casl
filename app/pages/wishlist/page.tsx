'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Image from 'next/image';
import Table from "react-bootstrap/Table"
import { useDispatch } from 'react-redux';
import { removeFromLike } from '../../store/cartSlice';
import { clearLikes } from '../../store/cartSlice';
import { incrementQuantity, decrementQuantity } from '../../store/cartSlice';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { SlDislike } from "react-icons/sl";
import Swal from 'sweetalert2';

const WishList: React.FC = () => {

    const [total, setTotal] = useState<any>();

    const cartItems = useSelector((state: RootState) => state.cart.likeItems);

    const dispatch = useDispatch();
    const removeItm = (id: any) => {
        dispatch(
            removeFromLike(id)
        )
    }
    const router = useRouter();
    const { user } = useUser();
   

    const clearCartItem = () => {
        dispatch(clearLikes())
    }

    let price = 0;

    useEffect(() => {
        let total = 0;
        cartItems.forEach((value) => {
            total += value.quantity * value.proprice;
        })
        setTotal(total);
        if (!user?.fullName) {
            router.back();
            Swal.fire({
                title: "Please Login!!",
                icon: "warning"
            });
        }
    }, [cartItems]);

    return (
        <>
            <p className='text-2xl font-bold text-center p-3 '>Likes Items</p>
            <div id="products">
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Image</th>
                            {/* <th>Quantity</th> */}
                            <th>Dislike</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{item.proname}</td>
                                <td>{item.protitle}</td>
                                <td>{item.proprice * item.quantity}</td>
                                <td><Image src={item.proimgurl} alt='proimage' height={50} width={50} /></td>
                                {/* <td>
                                    <span className='flex items-center gap-3 content-center text-center ml-4'>
                                        <FaMinusCircle onClick={() => dispatch(decrementQuantity(item.id))} />
                                        {item.quantity}
                                        <FaPlusCircle onClick={() => dispatch(incrementQuantity(item.id))} />
                                    </span>
                                </td> */}
                                <td><Button size='sm' variant='danger' onClick={() => removeItm(item.id)}><SlDislike /></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div id='clrbtn'>

                    {/* <Button size='sm' variant='success' onClick={() => { router.push("/pages/checkout") }}>WishList</Button> */}
                    <Button size='sm' variant='danger' onClick={clearCartItem} >Clear Cart</Button>
                    <Button size='sm' variant='' ><span className='font-bold text-2xl'>Total Price : {total}</span></Button>
                </div>
            </div>
        </>
    )
}

export default WishList