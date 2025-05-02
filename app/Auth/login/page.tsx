
"use client"
import "../login/style.css"
import loginUser from "../../actions/login/login"
import { useRouter } from "next/navigation";
import LoginNav from "@/app/_components/LoginNav";
import React from "react";
import Swal from "sweetalert2";

const initialstate={
  success: undefined,
  error: ""
};


export default function Form(){
  const[state,formAction] = React.useActionState(loginUser, initialstate);
  const[loading,setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (state?.error) {
      console.log(state.error);
    } else if (state?.data) {
      const { role, status, name, email, id } = state.data;
  
      if (status === "pending") {
        Swal.fire({
          title: "You don't have access control contact to Admin or Superadmin",
          icon: "warning"
        });
        return;
      }
  
      if (role === "Vendor") {
        localStorage.setItem("vendorname", name);
        localStorage.setItem("vendoremail", email);
        localStorage.setItem("id", id.toString());
        Swal.fire({
          title: "Login Successfully Completed!",
          icon: "success"
        });
        setLoading(true)
        router.push("/vendordashboard");
      } else if (role === "Admin") {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("id", id.toString());
        Swal.fire({
          title: "Login Successfully Completed!",
          icon: "success"
        });
        setLoading(true)
        router.push("/admindashboard");
      } else {
        Swal.fire({
          title: "Role not defined!",
          icon: "warning"
        });
      }
    }
  }, [state, router]);
  


  return (
    <>
    <LoginNav/>
    <div id="insertform">
    <form action={formAction} className='flex flex-col items-center p-4'>
      <p className="text-center font-bold text-2xl">Login Page</p>
      <select name="role" id="" title="Choose Role">
        <option>Select Role</option>
        <option value="Vendor">Vendor</option>
        <option value="Admin">Admin</option>
      </select>
      <input type="email" required name="email"  placeholder='email' className='p-2 border-1 mt-2 w-70'/>
      <input type="password" required name="password"  placeholder='password'  className='p-2 border-1 mt-2 w-70'/>
      <button type="submit" className='p-2 border-1 mt-2 w-70' disabled={loading}>
        {loading?("Processing"):("Login")}
      </button>
      <p className="text-center p-2 cursor-pointer" onClick={()=>{router.push("/Auth/signup")}}>dont have an account</p>
    
      {state?.success?(
        <p className="text-green-800">{state?.success}</p>
      ):(
        <p className="text-red-800">{state?.error}</p>
      )}
    </form>
    </div>
    </>
  )
}