import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ErrorMessage, Field, Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { clearPasswordFields } from '../redux/changePasswordSlice';

interface FormData{
    oldPassword:string,
    newPassword:string,
    confirmPassword:string;
}
const initialValues:FormData={
   oldPassword:'',
   newPassword:'',
   confirmPassword:''
}

const ChangePassword = () => {
    
    const userId=Cookies.get('userId')
    const dispatch=useDispatch();

      const validationSchema = Yup.object({
    oldPassword:Yup.string() .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character" ) 
            .required("Password is required"),
    newPassword: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character" )
            .required("Password is required"),
    confirmPassword: Yup.string() .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
         "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character" )
         .required("Password is required"),
  });


  const mutation=useMutation({
    mutationFn:async(passwordData:FormData)=>{
        const response=await axios.put(`http://localhost:8004/app/changePassword/${userId}`,passwordData)
        return response.data;
    },
     onSuccess: () => {
      alert('Password changed successfully!');
      dispatch(clearPasswordFields());
    },
    onError: (error: Error) => {
      console.error('Something went wrong,password not updated',error);
    },
  })
  const handleSubmit=(values:FormData)=>{
      try{
       console.log("Form submitted");
       mutation.mutate(values)
    } catch (error) {
        console.error("Error in handleSubmit:", error);
    }
  }

  return (
    <div className='changePassword'>
         <div className='heading flex '>
             <img src='/backArrow.png' className='h-8 w-10'/>
             <h2 className='text-2xl text-left mb-8 '>Change Password</h2>
        </div>
         <div className=" border-b bg-white rounded-[10px] p-8 shadow-lg d-flex">
             <Formik validationSchema={validationSchema} onSubmit={handleSubmit}
             initialValues={initialValues}>
                {()=>(
                    <form className='space-y-4'>
                          <div>
                <label className="block text-sm font-medium text-gray-700">
                  Old Password
                </label>
                <Field
                  type="password"
                  name="oldPassword"
                  className="w-1/2 mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  className="w-1/2 mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-1/2 mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className=" bg-[#3E5677] text-white py-2 px-12 ms-40 rounded-md shadow-md hover: bg-[#3E5677] transition duration-200" >
               Update
              </button>
                    </form>
                )}

             </Formik>
         </div>

    </div>
  )
}

export default ChangePassword

