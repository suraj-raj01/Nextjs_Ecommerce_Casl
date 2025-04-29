'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import Image from 'next/image';
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '../../store/cartSlice';
import { createOrder } from '@/app/actions/createOrders';
import { useUser } from '@clerk/nextjs';
import "../checkout/style.css";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const CheckOut: React.FC = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const[total,setTotal] = useState<any>();
    const dispatch = useDispatch();
    const router = useRouter();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    let price = 0;
    const username = user?.fullName;
    const useremail = user?.emailAddresses[0].emailAddress
    console.log(username, useremail);

    useEffect(() => {
        let total = 0;
        cartItems.forEach((value) => {
            total += value.quantity * value.proprice;
        })
        setTotal(total);
    }, [cartItems]);


    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);


    const clearCartItem = () => dispatch(clearCart());
    const removeItm = (id: any) => dispatch(removeFromCart(id));
    let productname = "";

    const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const order = await createOrder(null, formData);

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: price,
            currency: order.currency,
            name: productname || null,
            order_id: order.id,
            handler: function (response: any) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

                // dispatch(clearCart());
                router.push("/pages/userprofile");
            },
            prefill: {
                name: cartItems.map((key) => { key.proname }) || '',
                email: user?.emailAddresses?.[0]?.emailAddress || '',
            },
            theme: { color: '#3399cc' },
        };

        if (typeof window !== 'undefined' && window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            alert("Razorpay SDK failed to load. Are you online?");
        }

        setLoading(false);
    };


    return (
        <div>
            <p className='text-2xl font-bold text-center p-3'>Checkout Page</p>
            <hr />
            {cartItems.length > 0 ? (
                <div id="main">
                    <div id="products">
                        <h3>Product details</h3>
                        <hr />
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Quantity</th>
                                    <th>Delete</th>
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
                                                {/* <FaMinusCircle onClick={() => dispatch(decrementQuantity(item.id))} /> */}
                                                {item.quantity}
                                                {/* <FaPlusCircle onClick={() => dispatch(incrementQuantity(item.id))} /> */}
                                            </span>
                                        </td>
                                        <td><Button size='sm' variant='danger' onClick={() => removeItm(item.id)}><MdDelete /></Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div id='clrbtn'>
                            {/* <Button size='sm' variant='success' onClick={() => router.push("/pages/checkout")}>Make Payment</Button> */}
                            <Button size='sm' variant='danger' onClick={clearCartItem}>Clear Cart</Button>
                            <Button size='sm' variant=''><span className='font-bold'>Total : {total} {"₹"}</span></Button>
                        </div>
                    </div>
                    <div id="deliveryform">
                        <h3>Delivery Address</h3>
                        <hr />
                        <form onSubmit={handlePayment} className='flex flex-col gap-3'>
                            <input required className='p-2 border-1' type="number" name="contact" placeholder="Contact Number" minLength={10} />
                            <textarea rows={5} required className='p-2 border-1' name="address" placeholder="Enter delivery address" />
                            <input required className='p-2 border-1' type="text" name="pincode" placeholder="PIN Code" />

                            <input type="number" id="amount" name="amount" defaultValue={price} readOnly title="Total amount to pay" />
                            <span>{username}</span>
                            <span>{useremail}</span>
                            <button className='border-1 p-2 bg-green-800 text-white' disabled={loading}>
                                {loading ? 'Processing...' : 'Pay Now'}
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <h2 className='text-center'>Data Not Found!!!</h2>
            )}

        </div>
    );
};

export default CheckOut;
