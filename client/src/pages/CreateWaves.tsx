import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setFormValues } from '../redux/wavesSlice';

interface FormValues {
  photoUrl: File | null;
  message: string;
}

const initialValues: FormValues = {
  photoUrl: null,
  message: "",
};

const CreateWaves = () => {
  const dispatch = useDispatch();
  const userId = Cookies.get('userId');
  
  const [photoUrl, setPhotoUrl] = useState<File | null>(null); 

  const validationSchema = Yup.object({
    photoUrl: Yup.mixed().required('Please upload a photo'),
    message: Yup.string().required('Message is required'),
  });

  const getUserDetails = async () => {
    const response = await axios.get(`http://localhost:8004/app/getUser/${userId}`);
    return response.data;
  };

  const { isLoading, isError, data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
  });

  useEffect(() => {
    if (userDetails) {
      console.log('User Details:', userDetails);
    }
  }, [userDetails]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("Payload Sent:", formData);
      const response = await axios.post(`http://localhost:8004/app/createWaves/${userId}`, formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Form submitted successfully', data)
      dispatch(setFormValues(data))
      setPhotoUrl(null);
    },
    onError: (error: AxiosError) => {
      console.error('Error submitting form:', error);
    },
  });

  const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    console.log('Form Data:', values);
    const formData = new FormData();
    if (photoUrl) {
      formData.append('photoUrl', photoUrl); 
    }
    formData.append('message', values.message);
    formData.append('name', userDetails.firstName);

    mutation.mutate(formData);
    alert('Wave created successfully');
    resetForm();
    setPhotoUrl(null);
  };

  return (
    <div className='createWaves'>
      <div className='heading flex'>
        <img src='/backArrow.png' className='h-8 w-10' />
        <h2 className='text-xl text-left mb-5 '>Create Waves</h2>
      </div>
      <div className="mt-0 border-b bg-white rounded-[10px] shadow-lg mr-2">

        <div className="profile-rectangle bg-[#C5B084] w-auto h-[127px] rounded-[10px] relative">
          <div className="absolute -bottom-8 right-[75%] transform -translate-x-1/2">
            <img src="/profileImage.jpg" alt="Profile" className="w-28 h-28 rounded-full border-2 border-white" />
          </div>
        </div>
        <div className='mt-8 ms-8 text-[#3C3D3E]'><h6>What do you want to share?</h6></div>
        {isLoading && <p>Loading user details...</p>}
        {isError && <p>Error fetching user details. Try again.</p>}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mt-4 px-8">
                
                <input
                  name='photoUrl'
                  type='file'
                  accept='image/*'
                  className='w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none'
                  onChange={(event) => {
                    if (event.target.files) {
                      setFieldValue('photoUrl', event.target.files[0]);
                      setPhotoUrl(event.target.files[0]); 
                    }
                  }}
                />
                <ErrorMessage
                  name="photoUrl"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                {/* Message Input */}
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Write your message..."
                  className="w-full mt-4 h-32 px-4 py-2 border border-gray-300 rounded-md resize-none"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-30 h-13 px-6 py-2 ms-8 mt-5 mb-4 text-white text-xl bg-[#3E5677] hover:bg-[#2E4155] rounded-md text-sm"
                >
                  {isSubmitting ? 'Creating...' : 'Create Wave'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateWaves;
