
"use client"
import "../login/style.css"
import { useRouter } from "next/navigation";
import {registerUser} from "../../actions/login/registration"
import LoginNav from "@/app/_components/LoginNav";
import React from "react";

const initialstate={
  success: undefined,
  error: "",
};

export default function Form(){
  const[state,formAction] = React.useActionState(registerUser, initialstate);
  const router = useRouter()
  if (state?.success === true) {
    router.push("/Auth/login");
  }

  React.useEffect(() => {
    if (state?.success === true) {
      router.push("/Auth/login");
    }
  }, [state, router]);

  return (
    <>
    <LoginNav/>
    <div id="insertform">
    <form action={formAction} className='flex flex-col items-center p-4'>
      <p className="text-center font-bold text-2xl">SIGNUP</p>
      <select name="role" id="" title="Choose Role">
        <option>Select Role</option>
        <option value="Vendor">Vendor</option>
        <option value="Admin">Admin</option>
      </select>
      <input type="text" required name="name"  placeholder='name' className='p-2 border-1 mt-2 w-70'/>
      <input type="email" required name="email"  placeholder='email' className='p-2 border-1 mt-2 w-70'/>
      <input type="text" required name="contacts"  placeholder='contact'  className='p-2 border-1 mt-2 w-70'/>
      <input type="password" required name="password"  placeholder='password'  className='p-2 border-1 mt-2 w-70'/>
      <button type="submit" className='p-2 border-1 mt-2 w-70'>SIGNUP</button>
      <br />
      <p className="text-center p-2 cursor-pointer" >Already have an account?  <span className="font-bold text-blue-700" onClick={()=>{router.push("/Auth/login")}}>LOGIN</span> </p>
    </form>
    </div>
    </>
  )
}