'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { AiFillDashboard } from 'react-icons/ai';
import { RiInsertColumnRight } from 'react-icons/ri';
import { AiFillProduct } from "react-icons/ai";
import DashbaordFooter from '../_components/DashbaordFooter';
import { IoSettingsSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { IoMdLogOut } from "react-icons/io";

interface VendorLayoutProps {
  children: ReactNode;
}

export default function VendorLayout({ children }: VendorLayoutProps) {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem("email");

      if (!storedEmail) {
        alert("Please Login First");
        router.push("/Auth/login");
      } else {
        setEmail(storedEmail);
      }
    }
  }, [router]);

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

  const logOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      router.push("/Auth/login");
    }
  };

  return (
    <main>
      <header id="vendor-nav">
        <div className="flex items-center content-center gap-3">
          <FaBars onClick={sidebar} id="menu" style={{ display: 'none' }} />
          <ImCancelCircle id="cancelbtn" onClick={cancelbtn} style={{ display: 'block' }} />
          VENDOR DASHBOARD
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '18px' }}>
          <p className='text-center'>{email}</p>
          {email ? (
            <p onClick={logOut} className='text-red-500 text-2xs flex items-center content-center gap-1 cursor-pointer'><IoMdLogOut />Logout</p>
          ) : null}
        </div>
      </header>

      <div id="vendor-main" className="flex">
        <div id="vendordashboard" style={{ display: 'block' }}>
          <Link href="/vendordashboard" className="flex items-center gap-3 text-2xs">
            <AiFillDashboard />
            Dashboard
          </Link>
          <Link href="/vendordashboard/insert" className="flex items-center gap-3 text-2xs">
            <RiInsertColumnRight />
            Insert Product
          </Link>
          <Link href="/vendordashboard/display" className="flex items-center gap-3 text-2xs">
            <AiFillProduct />
            Display Products
          </Link>
          <Link href="#" className="flex items-center gap-3 text-2xs">
            <IoSettingsSharp />
            Settings
          </Link>
        </div>
        <div className="flex-1">{children}</div>
      </div>
      <DashbaordFooter />
    </main>
  );
}
