import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setAdminUser } from "../redux/adminSlice";
// Define the UserState interface
interface UserState {
  token: string;    
  user: {      
    id:string;     
    email: string;
    phoneNumber?: string; 
  };
  isLoggedIn: boolean;
}
interface LoginFormValues {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      )
      .required("Password is required"),
  });

 
  const mutation = useMutation<UserState, Error, LoginFormValues>({
    mutationFn: async (formData: LoginFormValues) => {
      const response = await axios.post("http://localhost:8004/app/adminLogin", formData);
       console.log("Response Data:", response.data);
      return response.data; 
    },
    onSuccess: (data: UserState) => {
      const{token,user}=data;
      Cookies.set("authToken",token);
      Cookies.set("userId",user.id)
      dispatch(setAdminUser({ ...user, isLoggedIn: true ,token})); 
      navigate("/adminDashboard"); 
      alert("Login Successful!");
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    },
  });

  const handleSubmit = (
    values: LoginFormValues,
    { resetForm }: FormikHelpers<LoginFormValues>
  ) => {
    mutation.mutate(values);
    resetForm();
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 hidden md:flex">
        <img
          src="/leftImage.png"
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-1/2">
          <h2 className="text-4xl font-medium text-left mb-6">Admin Login</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form className="space-y-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-600 text-left"
                  >
                    Email Address
                  </label>
                  <Field
                    type="email"
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

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-600 text-left"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                 <div className="text-left mt-1">
                  <Link
                    to="/"
                    className="text-[#B18D4B] text-sm hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="text-left">
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-[#3E5677] hover:bg-[#2E4155] rounded-md text-sm"
                  >
                    Log In
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

export default AdminLogin;
