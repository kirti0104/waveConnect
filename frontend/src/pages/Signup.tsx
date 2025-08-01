

import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link,useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { handleApiError } from "../utils/handleApiError";
import {toast} from 'react-toastify';
import axios from "axios";




interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {

  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const initialValues: UserState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .max(100, "First name cannot exceed 100 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "Last name must be at least 3 characters")
      .max(100, "Last name cannot exceed 100 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$#!%*?&]{8,}$/,
        "At least 8 characters, uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async(values: UserState) => {
   
   try{
    const response=await axios.post("http://localhost:8004/api/auth/signup", values);
    toast.success(response.data.message)
    navigate('/Login')

   }
   catch(error:unknown)
   {
    const message = handleApiError(error, 'Signup failed');
    toast.error(message)
   
   }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-gray-100">
      {/* Left Image Section */}
      <div className="w-1/2 hidden md:flex">
        <img
          src="/leftImage.png"
          alt="Signup Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg box-border overflow-hidden">
  <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
  >
    {() => (
      <Form className="space-y-4">
        {/* First & Last Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="text-sm font-medium text-gray-600">First Name</label>
            <Field type="text" name="firstName" className="w-full px-4 py-2 border rounded-md" />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="w-full">
            <label className="text-sm font-medium text-gray-600">Last Name</label>
            <Field type="text" name="lastName" className="w-full px-4 py-2 border rounded-md" />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-600">Email</label>
          <Field type="email" name="email" className="w-full px-4 py-2 border rounded-md" />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-gray-600">Phone Number</label>
          <Field type="text" name="phoneNumber" className="w-full px-4 py-2 border rounded-md" maxLength={10} />
          <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-600">Password</label>
          <div className="relative">
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-4 py-2 border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-medium text-gray-600">Confirm Password</label>
          <div className="relative">
            <Field
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="w-full px-4 py-2 border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={toggleConfirmPassword}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>
          <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        {/* Redirect Link */}
        <div className="text-sm text-right">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md transition duration-200"
        >
          Sign Up
        </button>
      </Form>
    )}
  </Formik>
</div>

      </div>
    </div>
  );
};

export default Signup;
