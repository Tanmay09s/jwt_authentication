import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const {login,loading} = useAuth();

  const [formData,setFormData] = useState({
    email:"",
    password: "",
  });
  const [error,setError] = useState("");

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = async(e) =>{
  e.preventDefault();
  setError("");

  if(!formData.email || !formData.password){
    setError("please Fill in all fields");
    return;
  }

  try{
    await login(formData);
    navigate("/dashboard");
  }catch(error){
    setError(
       error.response?.data?.message || "Login failed."
    );
  }
}

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
        <h1 className='text-3xl font-bold text-center mb-6'>
          Login
        </h1>

        {error &&(
          <div className='mb-4 rounded bg-red-100 p-3 text-red-700'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block mb-2 font-medium'>
              Email
            </label>

            <input type="email"
            name="email"
            value = {formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
            className='w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

           <div>
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        </form>
      </div>
    </div>
  )
}

export default Login