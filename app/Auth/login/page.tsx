
"use client"
import "../login/style.css"
import loginUser from "../../actions/login/login"
import { useRouter } from "next/navigation";
import LoginNav from "@/app/_components/LoginNav";
import { sendOtp } from "../../actions/login/login";
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

  const [email, setEmail] = React.useState<any>('');
  const [role, setRole] = React.useState<any>('');
  const [touched, setTouched] = React.useState<any>(false);
  const [showSecondInput, setShowSecondInput] = React.useState(false);

  // Simple email regex to check validity
  const isValidEmail = (email:any) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e:any) => {
    setEmail(e.target.value);
    if(showSecondInput) {
      setShowSecondInput(false);
    }
  };
  const handleVerifyClick = async() => {
    setShowSecondInput(true);
    const data = await sendOtp(role,email);
    if(data?.success){
    Swal.fire({
      title: "OTP Sent to Your Email",
      icon: "success"
    });
    setTouched(false);
  }else{
    Swal.fire({
      title: "Email not verified",
      icon: "warning"
    });
  }
  };

  const handleBlur = () => {
    setTouched(true);
  };

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
      <p className="text-center font-bold text-2xl">LOGIN</p>
      <select name="role" id="" title="Choose Role" value={role}
        onChange={(e)=>{setRole(e.target.value)}}>
        <option>Select Role</option>
        <option value="Vendor">Vendor</option>
        <option value="Admin">Admin</option>
      </select>
      <input
        type="email"
        required
        name="email"
        placeholder="email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched?(
        isValidEmail(email) && (
          <button type="button" onClick={handleVerifyClick} className="mt-0 mb-2 font-bold">  
            Generate OTP
          </button>
        )
      ):(
        <p>Enter OTP</p>   )
      }
      {showSecondInput && (
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          style={{ display: 'block', marginTop: '10px' }}
        />
      )}
      <input type="password" required name="password" disabled={touched}  placeholder='password'  className='p-2 border-1 mt-2 w-70'/>
      <button type="submit" className='p-2 border-1 mt-2 w-70' disabled={touched||loading}>
        {loading?("Processing"):("LOGIN")}
      </button>
      <br />
      <p className="text-center p-2 cursor-pointer" >Dont have an account <span className="font-bold text-blue-700" onClick={()=>{router.push("/Auth/signup")}}>SignUp</span></p>
    
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