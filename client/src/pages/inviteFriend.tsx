import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setFormValues } from '../redux/inviteFriendsSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  receiverFullName: string;
  receiverEmail: string;
  message: string;
}
  const initialValues: FormValues = {
    receiverFullName: "",
    receiverEmail: "",
    message: "",
  };

const InviteFriend = () => {

  const userId=Cookies.get('userId');
  const navigate=useNavigate();

const dispatch=useDispatch();
    const validationSchema = Yup.object({
    receiverFullName: Yup.string()
      .min(2, "Full Name must be at least 2 characters")
      .required("Full Name is required"),
    receiverEmail: Yup.string()
      .email("Invalid email address")
      .required("Email Address is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const mutation=useMutation({
    mutationFn:async(formData:FormValues)=>{
      console.log("Payload Sent:", formData);
      const response=await axios.post(`http://localhost:8004/app/inviteFriend/${userId}`,formData)
      return response.data;
    },
    onSuccess:(values:FormValues)=>{
      console.log('form submitted successfully')
      dispatch(setFormValues(values))
      
    },
     onError: (error) => {
      console.error('Error submitting form:', error);
    },

  })

   const handleSubmit = (values: FormValues) => {
    console.log("Form Values:", values);
    mutation.mutate(values)
    navigate('/friends');
  };

  return (
    <div className='inviteFriends'>
        <div className='profile'>
        <div className='heading flex '>
             <img src='/backArrow.png' className='h-8 w-10'/>
             <h2 className='text-2xl text-left mb-8 '>Friends</h2>
        </div>
        <div className="font-nunito text-[20px] font-bold leading-[27.28px] text-left decoration-from-font text-[#535C61]">
       Invites some friends Jasmine, show them your Waves and let’s see what they can do!
     </div>

     <div className="mt-8 border-b bg-white rounded-[10px] p-8 shadow-lg">
      
     <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                {/* Full Name & Email Address (Two Inputs in One Row) */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="receiverFullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <Field
                      id="receiverFullName"
                      name="receiverFullName"
                      type="text"
                      className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="receiverFullName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="receiverEmail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <Field
                      id="receiverEmail"
                      name="receiverEmail"
                      type="email"
                      className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="receiverEmail"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Message (Full Width) */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <div className="text-right">
                  <button type="submit" className="w-40 h-13 px-6 py-2 text-white text-xl bg-[#3E5677] hover:bg-[#2E4155] rounded-md text-sm" > Friends</button>
               </div>
                </div>
              </Form>
            )}
          </Formik>
     </div>
     

    </div>
</div>

  )
}

export default InviteFriend;
