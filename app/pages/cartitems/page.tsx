'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Image from 'next/image';
import Table from "react-bootstrap/Table"
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cartSlice';
import { clearCart } from '../../store/cartSlice';
import { incrementQuantity, decrementQuantity } from '../../store/cartSlice';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useUser } from '@clerk/nextjs';
import Swal from 'sweetalert2';

const CartItems: React.FC = () => {

    const [total, setTotal] = useState<any>();

    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    console.log(cartItems);
    const dispatch = useDispatch();

    const removeItm = (id: any) => {
        dispatch(
            removeFromCart(id)
        )
    }
    const router = useRouter();
    const user = useUser();

   

    const clearCartItem = () => {
        dispatch(clearCart())
    }

    let price = 0;

    useEffect(() => {
        let total = 0;
        cartItems.forEach((value) => {
            total += value.quantity * value.proprice;
        })
        setTotal(total);
        if (!user?.user) {
            // router.back();
            Swal.fire({
                title: "Please Login!!",
                icon: "warning"
            });
        }
    }, [cartItems]);

    return (
        <>
            <p className='text-2xl font-bold text-center p-3 '>Cart Items 🛒</p>
            <div id="cartproducts">
                {user?.isSignedIn ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td>{item.proname}</td>
                                    <td>{item.protitle}</td>
                                    <td>{item.proprice * item.quantity}</td>
                                    <td><Image src={item.proimgurl} alt='proimage' height={50} width={50} /></td>
                                    <td>
                                        <span className='flex items-center gap-3 content-center text-center ml-4'>
                                            <FaMinusCircle onClick={() => dispatch(decrementQuantity(item.id))} />
                                            {item.quantity}
                                            <FaPlusCircle onClick={() => dispatch(incrementQuantity(item.id))} />
                                        </span>
                                    </td>
                                    <td><Button size='sm' variant='danger' onClick={() => removeItm(item.id)}><MdDelete /></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <>
                        <div className='flex items-center text-center '>
                            <h2 className='text-center m-5 text-red-800'>Seems Like You're not LoggedIn!</h2>
                            <Button onClick={() => { router.push("https://joint-krill-9.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fpages%2Fcartitems") }}>Login</Button>
                        </div>
                    </>
                )}

                {
                    user?.isSignedIn ? (
                        <div id='clrbtn'>
                            <Button size='sm' variant='success' onClick={() => { router.push("/pages/checkout") }}>CheckOut</Button>
                            <Button size='sm' variant='danger' onClick={clearCartItem} >Clear Cart</Button>
                            <Button size='sm' variant='' ><span className='font-bold text-2xl'>Total Price : {total}</span></Button>
                        </div>
                    ) : (
                        ""
                    )
                }
            </div>
        </>
    )
}

export default CartItems