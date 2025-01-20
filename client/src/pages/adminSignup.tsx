import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setAdminUser } from "../redux/adminSlice";

interface UserState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AdminSignup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: SignupFormValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .max(100, "Full name cannot exceed 100 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
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

  const mutation = useMutation<UserState, Error, SignupFormValues>({
    mutationFn: async (formData: SignupFormValues) => {
      const response = await axios.post(
        "http://localhost:8004/app/adminSignup",
        formData
      );
      return response.data;
    },
    onSuccess: (data: UserState) => {
      dispatch(setAdminUser({ ...data, isLoggedIn: true }));
      alert("Registration Successful!");
      navigate("/login");
    },
    onError: (error: Error) => {
      console.error("Error registering user:", error);
      alert("Registration failed.");
    },
  });

  const handleSubmit = (
    values: SignupFormValues,
    { resetForm }: FormikHelpers<SignupFormValues>
  ) => {
    mutation.mutate(values);
    resetForm();
  };

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
        <div className="w-3/4 max-w-md">
          <h2 className="text-4xl font-medium text-left mb-6">Admin Sign Up</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm text-gray-600 text-left mb-1"
                  >
                    Full Name
                  </label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-600 text-left mb-1"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    className="block text-sm text-gray-600 text-left mb-1"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
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
                    className="block text-sm text-gray-600 text-left mb-1"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="text-left mt-1">
                 <Link to="/adminLogin" className="text-[#B18D4B] text-sm hover:underline">  Login </Link> </div>

                {/* Submit Button */}
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

export default AdminSignup;
