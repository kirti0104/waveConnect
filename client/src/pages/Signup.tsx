import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik,} from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { Link, useLocation, } from "react-router-dom";
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { register } from "../slices/auth";

// Define the UserState interface
interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  
}

const Signup: React.FC = () => {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search); 
  const senderId = params.get('senderId');
  console.log(senderId)
  
  const[showPassword, setShowPassword]=useState(true)
 
  const tooglePassword=()=>{
    setShowPassword(!showPassword)
  }

  const initialValues: UserState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  // Validation Schema using Yup
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
      .matches(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit number starting with 6-9")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });



  const handleSubmit= (values:SignupFormValues)=>{
    const userData=values;
    dispatch(register(userData))
  
  }


  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* Left Image Section */}
      <div className="w-1/2 hidden md:flex">
        <img
          src="/leftImage.png"
          alt="Signup Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-1/2">
          <h2 className="text-4xl font-medium text-left mb-6">Sign Up</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form className="space-y-6">
                {/* First Name and Last Name */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm text-gray-600 text-left"
                    >
                      First Name
                    </label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm text-gray-600 text-left"
                    >
                      Last Name
                    </label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-600 text-left"
                  >
                    Enter Email
                  </label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm text-gray-600 text-left"
                  >
                    Enter Phone No.
                  </label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-600 text-left"
                  >
                    Password
                  </label>
                  <div className="flex w-full  py-2 border border-gray-300 rounded-md ">
                    <Field type={showPassword ? "password" : "text"}  id="password"name="password" />
                   <button  type="button" onClick={tooglePassword}
                   className="ml-20" 
                  >
                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                  </button>
                  </div>
                           
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm text-gray-600 text-left"
                  >
                    Confirm Password
                  </label>
                  <div className="flex w-full  py-2 border border-gray-300 rounded-md ">
                      <Field type={showPassword ? "password" : "text"}   id="confirmPassword"  name="confirmPassword" />
                        <button type="button" onClick={tooglePassword} className="ml-20"   >
                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                  </button>
                  </div>
                 
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                
                <div className="text-left mt-1">
                  <Link
                    to="/login"
                    className="text-[#B18D4B] text-sm hover:underline"
                  >
                    Login
                  </Link>
                </div>

                <div className="text-left">
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-[#3E5677] hover:bg-[#2E4155] rounded-md text-sm"
                    
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
