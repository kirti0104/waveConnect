import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // For validation
import { RootState } from "../redux/store";
import { setUser } from "../redux/userSlice";
import axios from "axios";
import Cookies from "js-cookie";

  const validationSchema = Yup.object().shape({
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    maritalStatus: Yup.string().required("Marital status is required"),
    social: Yup.string().url("Invalid URL").nullable(),
    kids: Yup.number()
      .min(0, "Number of kids cannot be negative")
      .nullable(),
  });


const PersonalDetails = () => {
    const userId=Cookies.get('userId')
  const dispatch = useDispatch();
  const user = useSelector((state:RootState) => state.user);

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


  const mutation = useMutation({
    mutationFn:async(formData:unknown)=>{
        const response = await axios.put(`http://localhost:8004/app/updateUser/${userId}`, formData);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setUser(data));
      alert("Personal details updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating personal details:", error);
    },
  });

  const handleSubmit = (values:unknown) => {
    mutation.mutate(values);
  };

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error instanceof Error ? error.message : "An error occurred"}</p>}
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            
            <div className="flex space-x-4">
              
              <div className="flex-1">
                <label className="block text-lg text-gray-600 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <Field
                  type="date"
                  name="dob"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Gender */}
              <div className="flex-1">
                <label className="block text-lg text-gray-600 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

           
            <div className="flex space-x-4">
              {/* Marital Status */}
              <div className="flex-1">
                <label className="block text-lg text-gray-600 mb-1">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  name="maritalStatus"
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="single">single</option>
                  <option value="married">married</option>
                  <option value="divorced">divorced</option>
                  <option value="widowed">widowed</option>
                </Field>
                <ErrorMessage
                  name="maritalStatus"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Social */}
              <div className="flex-1">
                <label className="block text-lg text-gray-600 mb-1">
                  Social Media Link
                </label>
                <Field
                  type="url"
                  name="social"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://example.com"
                />
                <ErrorMessage
                  name="social"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Kids */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-lg text-gray-600 mb-1">
                  Kids (if any)
                </label>
                <Field
                  type="number"
                  name="kids"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Number of kids"
                />
                <ErrorMessage
                  name="kids"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#3E5677] text-white px-6 py-2 rounded-md hover:bg-[#2E4155] ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalDetails;
