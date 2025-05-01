'use client'

import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const [name,setName] = useState<string | null>(null);
    const router = useRouter()
    useEffect(()=>{
        if (typeof window !== 'undefined') {
            const storedName = localStorage.getItem("vendorname");
      
            if (!storedName) {
              alert("Please Login First");
              router.push("/Auth/login")
            } else {
              setName(storedName);
            }
          }
    })
    return(
        <>
        <div className="h-135">
        {/* <h1>Vendor Dashboard Layout</h1> */}
        <h2>Welcome <span className="text-red-600">{name}</span></h2>
        </div>
        </>
    )
}