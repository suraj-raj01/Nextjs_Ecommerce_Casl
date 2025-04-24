
"use client"
import "../login/style.css"
import { useFormState } from 'react-dom'
import loginUser from "../../actions/login/login"
import { useRouter } from "next/navigation";
import LoginNav from "@/app/_components/LoginNav";

const initialstate={
  success: undefined,
  error: ""
};


export default function Form(){
  const[state,formAction] = useFormState(loginUser, initialstate);

  const router = useRouter()
  
 if(state?.error){
  console.log(state.error)
 }
 else if(state?.data){
     if(state.data.role==="Vendor"){
      if(state.data.status){
      localStorage.setItem("name",state.data.name)
      localStorage.setItem("email",state.data.email)
      router.push("/vendordashboard")
      }else{
        alert("Please contact with Admin")
      }
    }
    else if(state.data.role==="Admin"){
      localStorage.setItem("name",state.data.name)
      localStorage.setItem("email",state.data.email)
      router.push("/admindashboard")
    }
    else{
      alert("role not defined!!")
    }
 }



  return (
    <>
    <LoginNav/>
    <div id="insertform">
    <form action={formAction} className='flex flex-col items-center p-4'>
      <p className="text-center font-bold text-2xl">Login Page</p>
      <select name="category" id="" title="Choose Role">
        <option>Select Role</option>
        <option value="Vendor">Vendor</option>
        <option value="Admin">Admin</option>
      </select>
      <input type="email" required name="email"  placeholder='email' className='p-2 border-1 mt-2 w-70'/>
      <input type="password" required name="password"  placeholder='password'  className='p-2 border-1 mt-2 w-70'/>
      <button type="submit" className='p-2 border-1 mt-2 w-70'>Submit</button>
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