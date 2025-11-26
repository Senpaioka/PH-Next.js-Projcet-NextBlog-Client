"use client";

import { useState } from "react";
import {useAuth} from '../../../hooks/useAuth';
import { useRouter } from "next/navigation";



function Login() {

  const {authenticateWithGoogle, loggingInVerifiedUser} = useAuth(); 
  const [isError, setIsError] = useState('');
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });



  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  // gmail authentication
  async function loginWithGoogle() {
    setIsError("");
    try {
      const result = await authenticateWithGoogle();
      if(result?.user) {
        router.push('/');
      }
    }
    catch (error) {
      setIsError(error.message);
      console.log(error);
    }
  }


  // login with email
  const handleLogin = async(e) => {
    e.preventDefault();
    setIsError("");
    
    const email = data.email;
    const password = data.password;

    try {
      const result = await loggingInVerifiedUser(email, password);
      if(result?.user) {
        router.push('/');
      }
    }catch (error) {
      setIsError(error.message);
      console.log(error);
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="card w-full max-w-md shadow-xl bg-white p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Create Account
          </a>
        </p>

        <div className="divider">Or</div>

         {/* Google */}
        <button onClick={loginWithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Login with Google
        </button>

        <p className="text-base text-red-500 text-center p-3">{isError}</p>

      </div>
    </div>
  );
}


export default Login;