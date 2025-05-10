'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { GoSidebarExpand } from "react-icons/go";
import { FaRegCircleUser, FaUserGroup } from 'react-icons/fa6';
import { AiFillDashboard } from 'react-icons/ai';
import DashbaordFooter from '../_components/DashbaordFooter';
import { FaCodePullRequest } from "react-icons/fa6";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function SuperAdminLayout({ children }: AdminLayoutProps){
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

  return (
    <main>
      <header id="vendor-nav">
        <div className="flex items-center content-center gap-3">
          <FaBars onClick={sidebar} id="menu" style={{display:'none'}}/>
          <GoSidebarExpand id="cancelbtn" onClick={cancelbtn} style={{ display: 'block' }} />
          SUPER ADMIN DASHBOARD
        </div>
        <FaRegCircleUser />
      </header>
      <div id="vendor-main" className="flex">
        <div id="vendordashboard" style={{ display: 'block' }}>
          <Link href="#" className="flex items-center gap-3 text-2xs">
            <AiFillDashboard />
            Dashboard
          </Link>
          <Link href="/superadmindashboard/createrole" className="flex items-center gap-3 text-2xs">
          <FaUserGroup />
            Create Role
          </Link>
          <Link href="/superadmindashboard/permissions" className="flex items-center gap-3 text-2xs">
          <FaUserGroup />
            Manage Permissions
          </Link>
          {/* <Link href="/superadmindashboard/managevendor" className="flex items-center gap-3 text-2xs">
          <FaUserGroup />
            Manage Vendors
          </Link>
          <Link href="/superadmindashboard/manageadmin" className="flex items-center gap-3 text-2xs">
            <FaUserGroup />
            Manage Admins
          </Link>
          <Link href="/superadmindashboard/requestadmin" className="flex items-center gap-3 text-2xs">
          <FaCodePullRequest />
            Request Admins
          </Link> */}
          {/* <Link href="#" className="flex items-center gap-3 text-2xs">
            <FaEdit />
            Update
          </Link> */}
        </div>
        <div className="flex-1">{children}</div>
      </div>
      <DashbaordFooter />
    </main>
  );
}
