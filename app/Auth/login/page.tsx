"use client";
import loginUser from "../../actions/login/login";
import { useRouter } from "next/navigation";
import LoginNav from "@/app/_components/LoginNav";
import { sendOtp } from "../../actions/login/login";
import React from "react";
import Swal from "sweetalert2";
import verifyEmail from "@/app/actions/login/verifyEmail";

const initialstate = {
  success: undefined,
  error: "",
};

export default function Form() {
  const [state, formAction] = React.useActionState(loginUser, initialstate);
  const [loading, setLoading] = React.useState(false);
  const [checkEmailVerify, setcheckEmailVerify] = React.useState<string | undefined>(undefined);
  const router = useRouter();

  const [email, setEmail] = React.useState<any>("");
  const [role, setRole] = React.useState<any>("");
  const [touched, setTouched] = React.useState<any>(false);
  const [showSecondInput, setShowSecondInput] = React.useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // const checkEmail = async () => {
  //   const data = await verifyEmail(email, role);
  //   if (data?.success) {
  //     Swal.fire({
  //       title: "Valid User!!",
  //       icon: "success",
  //     });
  //     setcheckEmailVerify(data?.user?.isverified)
  //     setTouched(false)
  //     console.log(data?.user?.isverified)
  //   }
  // }

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     checkEmail();
  //   }, 1500);
  // }, [isValidEmail(email)])

  const handleChange = (e: any) => {
    setEmail(e.target.value);
    if (showSecondInput) {
      setShowSecondInput(false);
    }
  };

  const handleVerifyClick = async () => {
    setShowSecondInput(true);
    const data = await sendOtp(role, email);
    if (data?.success) {
      Swal.fire({
        title: "OTP Sent to Your Email",
        icon: "success",
      });
      setTouched(false);
    } else {
      Swal.fire({
        title: "Email not verified",
        icon: "warning",
      });
    }
  };

  const handleBlur = async() => {
    setTouched(true);
    const data = await verifyEmail(email, role);
    console.log(data?.success);
    if (data?.success) {
      setcheckEmailVerify(data?.user?.isverified)
      console.log(data.user?.isverified)
      setTouched(false)
      const element = document.getElementById("isvalidemail");
      if (element) {
        element.style.display = "none";
      }
      if (data?.user?.isverified === "pending") {
        setTouched(true);
      }
      console.log(data?.user?.isverified)
    } else {
      Swal.fire({
        title: "Invalid Email!!",
        icon: "warning",
      });
    }
  };

  React.useEffect(() => {
    if (state?.error) {
      console.log(state.error);
    } else if (state?.data) {
      const { role, status, name, email, id } = state.data;

      if (status === "pending") {
        Swal.fire({
          title: "You don't have access control contact to Admin or Superadmin",
          icon: "warning",
        });
        return;
      }

      if (role === "Vendor") {
        localStorage.setItem("vendorname", name);
        localStorage.setItem("vendoremail", email);
        localStorage.setItem("id", id.toString());
        Swal.fire({
          title: "Login Successfully Completed!",
          icon: "success",
        });
        setLoading(true);
        router.push("/vendordashboard");
      } else if (role === "Admin") {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("id", id.toString());
        Swal.fire({
          title: "Login Successfully Completed!",
          icon: "success",
        });
        setLoading(true);
        router.push("/admindashboard");
      }
      else if (role === "Super Admin") {
        Swal.fire({
          title: "Login Successfully Completed!",
          icon: "success",
        });
        router.push("/superadmindashboard");
      }
      else {
        Swal.fire({
          title: "Role not defined!",
          icon: "warning",
        });
      }
    }
  }, [state, router]);


  return (
    <>
      <LoginNav />
      <div className="h-fit flex items-center justify-center p-4">
        <div className="bg-white p-8 mt-8 rounded-lg shadow-lg w-full max-w-md">
          <p className="text-center font-bold text-2xl text-red-600 mb-6">LOGIN</p>
          <form action={formAction} className="space-y-4">
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              title="select role"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option>Select Role</option>
              <option value="Vendor">Vendor</option>
              <option value="Admin">Admin</option>
            </select>

            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {touched && checkEmailVerify === "pending" && (
              <button
                type="button"
                onClick={handleVerifyClick}
                className="w-full mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
              >
                Generate OTP
              </button>
            )}

            {showSecondInput && (
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            )}

            <input
              type="password"
              required
              name="password"
              placeholder="Enter your password"
              disabled={touched}
              className="w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              type="submit"
              className="w-full p-2 bg-red-500 text-white rounded-md mt-4 disabled:opacity-50 hover:bg-red-600 focus:outline-none"
              disabled={touched || loading}
            >
              {loading ? "Processing..." : "LOGIN"}
            </button>

            <div className="text-center mt-4">
              <p>
                Don't have an account?{" "}
                <span
                  className="font-bold text-red-700 cursor-pointer"
                  onClick={() => {
                    router.push("/Auth/signup");
                  }}
                >
                  SignUp
                </span>
              </p>
            </div>

            {state?.success ? (
              <p className="text-green-800 text-center">{state?.success}</p>
            ) : (
              <p className="text-red-800 text-center">{state?.error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
