'use client';

import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaRegHeart, FaBars } from 'react-icons/fa6';
import { FaHeart } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdCart } from "react-icons/io";
import logo from '../../public/logo/logo.png';
import bag from '../../public/bag.svg';
import { useUser } from "@clerk/nextjs"

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function TopNav() {
  const router = useRouter();
  const [count, setCount] = React.useState<any>(0);
  const [likes, setLikes] = React.useState<any>(0);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const likeItems = useSelector((state: RootState) => state.cart.likeItems);

  const { user } = useUser();
  console.log(user);

  React.useEffect(() => {
    setCount(cartItems.length);
    setLikes(likeItems.length);
  })

  const sidebar = (): void => {
    const icon = document.getElementById('icon');
    const slidebar = document.getElementById('slidebar');
    const closebtn = document.getElementById('closebtn');
    if (icon && slidebar && closebtn) {
      icon.style.display = 'none';
      slidebar.style.display = 'block';
      closebtn.style.display = 'block';
    }
  };

  const closeBtn = (): void => {
    const icon = document.getElementById('icon');
    const slidebar = document.getElementById('slidebar');
    const closebtn = document.getElementById('closebtn');
    if (icon && slidebar && closebtn) {
      icon.style.display = 'block';
      slidebar.style.display = 'none';
      closebtn.style.display = 'none';
    }
  };

  const home = (): void => {
    router.push('/');
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" id="navbar">
        <Container>
          <Navbar.Brand >
            <FaBars id="icon" onClick={sidebar} />
            <AiOutlineClose
              id="closebtn"
              onClick={closeBtn}
              style={{
                display: 'none',
                padding: '5px',
                borderRadius: '50%',
                backgroundColor: 'ghostwhite',
                height: '30px',
                width: '30px',
                cursor: 'pointer'
              }}
            />
          </Navbar.Brand>
          <Navbar.Brand>
            <Image
              src={logo}
              alt="logo"
              height={40}
              className="p-0"
              onClick={home}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            {/* 
            <Form className="d-flex mr-4">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="secondary">Search</Button>
            </Form> */}

            <Nav id="icons" className="flex items-center content-center">
              {/* <Nav.Link href="#deets">
                <HiCurrencyRupee className="text-2xl" />
              </Nav.Link> */}
              <Nav.Link href="/pages/wishlist">
                {likes < 1 ? (
                  <div className='flex item-center content-between text-center font-bold'>
                    <span className=' flex flex-col item-center content-between text-2xl'> <span className='text-xs rounded-lg bg-gray-100'>{likes}</span> <FaHeart /></span>
                  </div>
                ) : (

                  <div className='flex item-center content-between text-center font-bold'>
                    <span className=' flex flex-col item-center content-between text-2xl'> <span className='text-xs rounded-lg bg-gray-100'>{likes}</span> <FaHeart className='text-red-400' /></span>
                  </div>
                )}
              </Nav.Link>
              <Nav.Link href="/pages/cartitems">
                {/* <span className='flex gap-2  p-1.5 font-bold'><IoMdCart className="text-2xl"/>Carts <span id='badge' className='position-absolute top-2 pl-2 text-xs'>{count}</span>
                </span> */}


                <div className='flex item-center content-between text-center font-bold'>
                  <span className=' flex flex-col item-center content-between text-2xl'> <span className='text-xs rounded-lg bg-gray-100'>{count}</span> <IoMdCart /></span>
                </div>


              </Nav.Link>
              <Nav.Link>
                {/* Custom dropdown logic if needed */}
              </Nav.Link>
              {!user ? (<button className="font-bold p-2 bg-red-400 text-white rounded-md" onClick={() => { router.push("/Auth/login") }}>Login</button>) :
                (
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                )}

              {/* <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn> */}
            </Nav>
          </Navbar.Collapse>
        </Container>

        {/* Sidebar */}
        <div id="slidebar">
          <div id="link">
            <div
              className="shadow-blue-300 p-2"
              style={{ borderRadius: '5px', border: '1px solid #d7d4d4' }}
            >
              <span className="text-black flex item-center gap-4">
                <p className="text-2xl font-bold">Top Collections</p>
                <Image src={bag} alt="bag" />
              </span>
              <p className="font-bold ml-2 hover:text-red-600 cursor-pointer" onClick={() => { router.push("/pages/samedaydelivery") }}>
                Same Day Delivery Gifts
              </p>
              <p className="font-bold ml-2 hover:text-red-600 cursor-pointer" onClick={() => { router.push("/pages/cakes") }}>
                Birthday Gifts
              </p>
              <p className="font-bold ml-2 hover:text-red-600 cursor-pointer" onClick={() => { router.push("/pages/personalized") }}>
                Personalized Gifts
              </p>
            </div>

            <p className="font-bold text-gray-400 text-xs mt-2">Shop By </p>

            <Form.Select aria-label="Default select example">
              <option>Personal Occasions</option>
              <option value="1">Birthday Gifts</option>
              <option value="2">Anniversary Gifts</option>
              <option value="3">Wedding & Engagement</option>
              <option value="4">Best Wishes</option>
            </Form.Select>

            <Form.Select aria-label="Default select example">
              <option>Categories</option>
              <option value="1">Cakes</option>
              <option value="2">Flowers</option>
              <option value="3">Plants</option>
              <option value="4">Home & Living</option>
              <option value="5">Fashion & Lifestyle</option>
              <option value="6">Toys & Games & Lifestyle</option>
            </Form.Select>

            <Form.Select aria-label="Default select example">
              <option>Festivals</option>
              <option value="1">Easter</option>
              <option value="2">Akshaya Tritiya</option>
              <option value="3">Rakhi</option>
              <option value="4">Janmashtami</option>
              <option value="5">Ganesh Chaturthi</option>
              <option value="6">Dussehra</option>
              <option value="7">Karwa Chauth</option>
              <option value="8">Dhanteras</option>
              <option value="9">Diwali</option>
            </Form.Select>

            <Form.Select aria-label="Default select example">
              <option>Special Days</option>
              <option value="1">Mothers Day</option>
              <option value="2">Fathers Day</option>
              <option value="3">Friendship Day</option>
              <option value="4">Independence Day</option>
              <option value="5">Teachers Day</option>
              <option value="6">Boss Day</option>
              <option value="7">Childrens Day</option>
              <option value="8">Valentines Day</option>
              <option value="9">Womens Day</option>
            </Form.Select>

            <Form.Select aria-label="Default select example">
              <option>Recipient</option>
              <option value="1">Him</option>
              <option value="2">Her</option>
              <option value="3">Teen</option>
              <option value="4">Kids</option>
            </Form.Select>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
