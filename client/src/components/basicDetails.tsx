import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { RootState } from "../redux/store";
import { setUser } from "../redux/userSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  addressOne: Yup.string().required("Address One is required"),
  addressTwo: Yup.string().optional(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string()
    .matches(/^\d{5}$/, "Zip Code must be 5 digits")
    .required("Zip Code is required"),
  socialSecurityNumber: Yup.string()
    .matches(/^\d{6}$/, "Social Security Number must be 6 digits")
    .optional(),
});

const BasicDetails: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const queryClient=useQueryClient();
  const userId = Cookies.get("userId");

  // Fetch user details from backend
  const getUserDetails = async () => {
    const response = await axios.get(`http://localhost:8004/app/getUser/${userId}`);
    return response.data;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
  });

  
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  // Mutation for updating user details
  const mutation = useMutation({
    mutationFn: async (formData: unknown) => {
      const response = await axios.put(`http://localhost:8004/app/updateUser/${userId}`, formData);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setUser(data));
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });

      alert("Details updated successfully!");
      
    },
    onError: () => {
      console.error("Error occurred while updating user details:", error);
      alert("Failed to update details. Please try again.");
    },
  });

  // Form submission handler
  const handleSubmit = (values: unknown) => {
    mutation.mutate(values);
  };

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Details</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error instanceof Error ? error.message : "An error occurred"}</p>}
      {!isLoading && !isError && (
        <Formik
  initialValues={user}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
  enableReinitialize
>
  {({ isSubmitting }) => (
    <Form className="space-y-4">
      {/* Existing Fields */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-lg text-gray-600 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            name="firstName"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="firstName"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="block text-lg text-gray-600 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            name="lastName"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="lastName"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      {/* Email & Social Security */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-lg text-gray-600 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <Field
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="email"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="block text-lg text-gray-600 mb-1">
            Social Security (Numbers Only)
          </label>
          <Field
            type="text"
            name="socialSecurityNumber"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="socialSecurityNumber"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      {/* Phone Number & Address One */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-lg text-gray-600 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <Field
            type="tel"
            name="phoneNumber"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="phoneNumber"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="block text-lg text-gray-600 mb-1">
            Address One <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            name="addressOne"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="addressOne"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      {/* New Fields */}
      <div className="flex space-x-4">
        {/* Address Two */}
        <div className="flex-1">
          <label className="block text-lg text-gray-600 mb-1">
            Address Two
          </label>
          <Field
            type="text"
            name="addressTwo"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="addressTwo"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>

         <div className="flex-1">
          <label className="block text-lg text-gray-600 mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            name="city"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="city"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>

      </div>

      <div className="flex space-x-4">
       
     
        <div className="flex-1">
          <label className="block text-lg text-gray-600 mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            name="state"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="state"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="block text-lg text-gray-600 mb-1">
            Zip Code <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            name="zipCode"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="zipCode"
            component="p"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="bg-[#3E5677] text-white px-6 py-2 rounded-md hover:bg-[#2E4155]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
    </Form>
  )}
</Formik>

      )}
    </div>
  );
};

export default BasicDetails;
