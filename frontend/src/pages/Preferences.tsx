import React, { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setPreferences } from "../redux/preferencesSlice";
import axios from "axios";


interface Preferences {
  language: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  wakeTime: string;
  bedTime: string;
  weight:string;
  height:string;
  bloodGlucose:string;
  cholesterol:string;
  bloodPressure:string;
  distance:string;
  communicationType:string[];
}

interface CommunicationState {
  systemEmails: boolean;
  memberServiceMails: boolean;
  sms: boolean;
  phoneCall: boolean;
  post: boolean;
}


// Initial form values
const initialValues: Preferences = {
  language: "English",
  breakfast: "",
  lunch: "",
  dinner: "",
  wakeTime: "",
  bedTime: "",
  weight:"",
  height:"",
  bloodGlucose:"",
  cholesterol:"",
  bloodPressure:"",
  distance:"",
  communicationType:[],
};

// Validation Schema using Yup
const validationSchema = Yup.object({
  language: Yup.string().required("Language is required"),
  breakfast: Yup.string().required("Breakfast time is required"),
  lunch: Yup.string().required("Lunch time is required"),
  dinner: Yup.string().required("Dinner time is required"),
  wakeTime: Yup.string().required("Wake time is required"),
  bedTime: Yup.string().required("Bed time is required"),
  weight: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Weight must be a valid number")
    .required("Weight is required"),
  height: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Height must be a valid number")
    .required("Height is required"),
  bloodGlucose: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Blood glucose must be a valid number")
    .required("Blood glucose is required"),
  cholesterol: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Cholesterol must be a valid number")
    .required("Cholesterol is required"),
  bloodPressure: Yup.string()
    .matches(/^\d+\/\d+$/, "Blood pressure must be in the format '120/80'")
    .required("Blood pressure is required"),
  distance: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Distance must be a valid number")
    .required("Distance is required"),
  communicationType: Yup.array()
    .of(Yup.string().required("Communication type is required"))
    .min(1, "At least one communication type is required")
    .required("Communication type is required"),
});

const Preferences: React.FC = () => {

  const [communicationState, setCommunicationState] = useState<CommunicationState>({
  systemEmails: false,
  memberServiceMails: false,
  sms: false,
  phoneCall: false,
  post: false,
});

const toggleCommunication = (type: keyof CommunicationState): void => {
  setCommunicationState((prevState) => ({
    ...prevState,
    [type]: !prevState[type],
  }));
};
  const dispatch = useDispatch();

    const mutation = useMutation({
    mutationFn: async (formData: Preferences) => {
      const response = await axios.post("http://localhost:8004/app/addPreferences", formData);
      return response.data;
    },
    onSuccess: (data: Preferences) => {
      dispatch(setPreferences(data));
      alert("Preferences updated successfully!");
    },
    onError: (error: Error) => {
      console.error("Error updating preferences:", error);
      alert("Failed to update preferences.");
    },
  });

  const handleSubmit = (values: Preferences, { resetForm }: FormikHelpers<Preferences>) => {
    try{
       console.log("Form submitted");
       mutation.mutate(values)
    } catch (error) {
        console.error("Error in handleSubmit:", error);
    }
  
    resetForm();
  };

  return (

  <div className="preferences">   
       <div className="heading flex items-center space-x-4 mb-8">
         <img src="/backArrow.png" className="h-8 w-10" alt="Back Arrow" />
         <h2 className="text-2xl text-left">Preferences</h2>
       </div>
           <div className="mt-8 border-b bg-white rounded-[10px] p-8 shadow-lg">
           <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {() => (
              <Form className="space-y-6">    
              <div className="grid grid-cols-2 gap-6">
                    {/* Language */}
                  <div>
                   <label htmlFor="language" className="block text-sm font-medium text-gray-600 mb-2">Language</label>
                    <Field as="select" id="language" name="language" className="border-gray-300 border p-2 rounded w-full ">
                       <option value="English">English</option>
                       <option value="Hindi">Hindi</option>
                     </Field>
                  </div>

                    {/* Breakfast */}
                  <div>
                   <label htmlFor="breakfast" className="block text-sm font-medium text-gray-600 mb-2">Breakfast Time</label>
                   <Field type="time" id="breakfast" name="breakfast" className="border-gray-300 border p-2 rounded w-full "/>
                  </div>

          {/* Lunch */}
                  <div>
                  <label htmlFor="lunch" className="block text-sm font-medium text-gray-600 mb-2">Lunch Time</label>
                  <Field type="time" id="lunch" name="lunch" className="border-gray-300 border p-2 rounded w-full"/>
                  </div>

          {/* Dinner */}
          <div>
            <label htmlFor="dinner" className="block text-sm font-medium text-gray-600 mb-2">
              Dinner Time
            </label>
            <Field
              type="time"
              id="dinner"
              name="dinner"
              className="border-gray-300 border p-2 rounded w-full "
            />
          </div>

          {/* Wake Time */}
          <div>
            <label htmlFor="wakeTime" className="block text-sm font-medium text-gray-600 mb-2">
              Wake Time
            </label>
            <Field
              type="time"
              id="wakeTime"
              name="wakeTime"
              className="border-gray-300 border p-2 rounded w-full "
            />
          </div>

          {/* Bed Time */}
          <div>
            <label htmlFor="bedTime" className="block text-sm font-medium text-gray-600 mb-2">
              Bed Time
            </label>
            <Field
              type="time"
              id="bedTime"
              name="bedTime"
              className="border-gray-300 border p-2 rounded w-full "
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Weight */}
          <div>
            <label htmlFor="weight" className="block text-sm text-gray-600 text-left">
              Weight
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="weightKg"
                  name="weight"
                  value="kg"
                  className="h-4 w-4 text-blue-600 "
                />
                <label htmlFor="weightKg" className="ml-2 text-sm text-gray-600">Kg</label>
              </div>
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="weightLb"
                  name="weight"
                  value="lb"
                  className="h-4 w-4 text-blue-600 focus:ring focus:ring-blue-500"
                />
                <label htmlFor="weightLb" className="ml-2 text-sm text-gray-600">Lbs</label>
              </div>

            </div>
          </div>

          {/* Height */}
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-600 mb-2">
              Height
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="heightCm"
                  name="height"
                  value="cm"
                  className="h-4 w-4 text-blue-600 "
                />
                <label htmlFor="heightCm" className="ml-2 text-sm text-gray-600">Cm</label>
              </div>
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="heightFt"
                  name="height"
                  value="ft/inches"
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="heightFt" className="ml-2 text-sm text-gray-600">Ft/Inches</label>
              </div>   
            </div>
            
          </div>
          
          {/*blood glucose*/}
           <div>
            <label htmlFor="bloodGlucose" className="block text-sm font-medium text-gray-600 mb-2">
              Blood Glucose
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="bloodGlucoseMmo"
                  name="bloodGlucose"
                  value="mmo/l"
                  className="h-4 w-4 text-blue-600 "
                />
                <label htmlFor="bloodGlucoseMmo" className="ml-2 text-sm text-gray-600">mmo/l</label>
              </div>
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="bloodGlucoseMg"
                  name="bloodGlucose"
                  value="mg"
                  className="h-4 w-4 text-blue-600 "
                />
                <label htmlFor="bloodGlucoseMg" className="ml-2 text-sm text-gray-600">mg/dl</label>
              </div>
            </div>        
          </div>

     {/*cholestrol*/}
        <div>
            <label htmlFor="cholesterol" className="block text-sm font-medium text-gray-600 mb-2">
              Cholesterol
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="cholesterolMmo"
                  name="cholesterol"
                  value="mmo/l"
                  className="h-4 w-4 text-blue-600 "
                />
                <label htmlFor="cholesterolMmo" className="ml-2 text-sm text-gray-600">mmo/l</label>
              </div>
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="cholesterolMg"
                  name="cholesterol"
                  value="mg"
                  className="h-4 w-4 text-blue-600 "
                />
                <label htmlFor="cholesterolMg" className="ml-2 text-sm text-gray-600">mg/dl</label>
              </div>
            </div>        
          </div>

    {/*Blood Pressure*/}
           <div>
            <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-600 mb-2">
              Blood Pressure
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="bloodPressurekPa"
                  name="bloodPressure"
                  value="kPa"
                  className="h-4 w-4 text-blue-600 "
                />
                <label htmlFor="bloodPressurekPa" className="ml-2 text-sm text-gray-600">kPa</label>
              </div>
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="bloodPressuremmHg"
                  name="bloodPressure"
                  value="kPa"
                  className="h-4 w-4 text-blue-600 "
                />
                <label htmlFor="bloodPressuremmHg" className="ml-2 text-sm text-gray-600">mm/Hg</label>
              </div>
            </div>        
          </div>

     {/*Distance*/}

        <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-600 mb-2">
              Distance
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="distancekm"
                  name="distance"
                  value="km"
                  className="h-4 w-4 text-blue-600 "
                />
                <label htmlFor="distance" className="ml-2 text-sm text-gray-600">km</label>
              </div>
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="distanceMiles"
                  name="distance"
                  value="miles"
                  className="h-4 w-4 text-blue-600 "
                />
                <label htmlFor="distanceMiles" className="ml-2 text-sm text-gray-600">miles</label>
              </div>
            </div>        
      </div>   
     </div>
    {/*communication type*/}
        <div>
        <label htmlFor="communicationType" className="block text-sm font-medium text-gray-600 mb-2">Communication Type</label>
         <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">System Emails</div>
             <div className="relative inline-flex items-center cursor-pointer">
               <span className="mr-2 text-sm text-gray-600">Off</span>
              <button  type="button" className="w-10 h-5 bg-gray-300 rounded-full" onClick={() => toggleCommunication('systemEmails')} >
          <span
            className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${communicationState.systemEmails ? 'translate-x-5 bg-blue-600' : ''}`}
          ></span>
        </button>
        <span className="ml-2 text-sm text-gray-600">On</span>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">Member Service Mails</div>
      <div className="relative inline-flex items-center cursor-pointer">
        <span className="mr-2 text-sm text-gray-600">Off</span>
        <button
          type="button"
          className="w-10 h-5 bg-gray-300 rounded-full"
          onClick={() => toggleCommunication('memberServiceMails')}
        >
          <span
            className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${communicationState.memberServiceMails ? 'translate-x-5 bg-blue-600' : ''}`}
          ></span>
        </button>
        <span className="ml-2 text-sm text-gray-600">On</span>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">SMS</div>
      <div className="relative inline-flex items-center cursor-pointer">
        <span className="mr-2 text-sm text-gray-600">Off</span>
        <button
          type="button"
          className="w-10 h-5 bg-gray-300 rounded-full"
          onClick={() => toggleCommunication('sms')}
        >
          <span
            className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${communicationState.sms ? 'translate-x-5 bg-blue-600' : ''}`}
          ></span>
        </button>
        <span className="ml-2 text-sm text-gray-600">On</span>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">Phone Call</div>
      <div className="relative inline-flex items-center cursor-pointer">
        <span className="mr-2 text-sm text-gray-600">Off</span>
        <button
          type="button"
          className="w-10 h-5 bg-gray-300 rounded-full"
          onClick={() => toggleCommunication('phoneCall')}
        >
          <span
            className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${communicationState.phoneCall ? 'translate-x-5 bg-blue-600' : ''}`}
          ></span>
        </button>
        <span className="ml-2 text-sm text-gray-600">On</span>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">Post</div>
      <div className="relative inline-flex items-center cursor-pointer">
        <span className="mr-2 text-sm text-gray-600">Off</span>
        <button type="button"
          className="w-10 h-5 bg-gray-300 rounded-full"
          onClick={() => toggleCommunication('post')}
        >
          <span
            className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${communicationState.post ? 'translate-x-5 bg-blue-600' : ''}`}
          ></span>
        </button>
        <span className="ml-2 text-sm text-gray-600">On</span>
      </div>
    </div>
  </div>
         </div>

        {/* Submit Button */}
         <div className="text-right">
            <button type="submit" className="px-6 py-2 text-white bg-[#3E5677] hover:bg-[#2E4155] rounded-md text-sm" > Update</button>
          </div>
      </Form>
    )}
  </Formik>
</div>
</div>

  );
};

export default Preferences;
