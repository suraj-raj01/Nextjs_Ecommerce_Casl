'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { FaRegCircleUser, FaUserGroup } from 'react-icons/fa6';
import { AiFillDashboard } from 'react-icons/ai';
import { RiInsertColumnRight } from 'react-icons/ri';
import { AiFillProduct } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import DashbaordFooter from '../_components/DashbaordFooter';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { MdLaptopChromebook } from "react-icons/md";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ClerkProvider, SignInButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import { useUser } from '@clerk/nextjs';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const sidebar = (): void => {
    const dashboard = document.getElementById('vendordashboard');
    const menu = document.getElementById('menu');
    const cancelBtn = document.getElementById('cancelbtn');

    if (dashboard && menu && cancelBtn) {
      dashboard.style.display = 'block';
      menu.style.display = 'none';
      cancelBtn.style.display = 'block';
    }
  };

  const cancelbtn = (): void => {
    const dashboard = document.getElementById('vendordashboard');
    const menu = document.getElementById('menu');
    const cancelBtn = document.getElementById('cancelbtn');

    if (dashboard && menu && cancelBtn) {
      dashboard.style.display = 'none';
      menu.style.display = 'block';
      cancelBtn.style.display = 'none';
    }
  };

  const [smShow, setSmShow] = useState(false);

  const {user} = useUser();

  return (
    <main>
      <header id="vendor-nav">
        <div className="flex items-center content-center gap-3">
          <FaBars onClick={sidebar} id="menu" style={{ display: 'none' }} />
          <ImCancelCircle id="cancelbtn" onClick={cancelbtn} style={{ display: 'block' }} />
          ADMIN DASHBOARD
        </div>

        <FaRegCircleUser />
      
        
      </header>
      <div id="vendor-main" className="flex">
        <div id="vendordashboard" style={{ display: 'block' }}>
        <p></p>
          <hr className='text-white'/>
          <Link href="/admindashboard" className="flex items-center gap-3 text-2xs">
            <AiFillDashboard />
            Dashboard
          </Link>
          <Link href="/admindashboard/insert" className="flex items-center gap-3 text-2xs">
            <RiInsertColumnRight />
            Insert Product
          </Link>
          <Link href="/admindashboard/display" className="flex items-center gap-3 text-2xs">
            <FaUserGroup />
            See Vendors
          </Link>
          <Link href="/admindashboard/products" className="flex items-center gap-3 text-2xs">
            <AiFillProduct />
            See Products
          </Link>
          <Link href="#" className="flex items-center gap-3 text-2xs" onClick={() => setSmShow(true)}>
            <IoSettingsSharp />
            Settings
          </Link>
        </div>
        <main style={{width:'100%'}}>
          {children}
        </main>
        </div>
      <DashbaordFooter />
      <Modal
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Settings
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='font-bold'>Appearance</p>
          <p className='flex items-center content-center gap-3 cursor-pointer'><CiLight /> Light Mode</p>
          <p className='flex items-center content-center gap-3 cursor-pointer'><MdDarkMode /> Dark Mode</p>
          <p className='flex items-center content-center gap-3 cursor-pointer'><MdLaptopChromebook /> System Default</p>
        </Modal.Body>
      </Modal>
    </main>
  );
}
