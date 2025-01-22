import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store';
import { setActiveTab } from '../redux/tabSlice';
import BasicDetails from '../components/basicDetails';
import PersonalDetailsForm from '../components/personalDetails';


const profile = () => {
    const dispatch=useDispatch();
     const activeTab = useSelector((state: RootState) => state.tab.activeTab);
    
     const handleChangePicture=()=>{
      
     }
 
  return (
    <div className='profile'>
        <div className='heading flex '>
             <img src='/backArrow.png' className='h-8 w-10'/>
             <h2 className='text-2xl text-left mb-8 '>Profile</h2>
        </div>

        <div className="mt-0 border-b bg-white rounded-[10px] shadow-lg mr-2">
        <div className="profile-rectangle bg-[#C5B084] w-auto h-[154px] rounded-[10px] relative">
          <div className="absolute -bottom-8 right-[75%] transform -translate-x-1/2">
            <img src="/profileImage.jpg" alt="Profile"className="w-40 h-40 rounded-full border-2 border-white" />
          </div>
          <div className='change-button text-right'>
            <button className="w-[205px] h-[50px] rounded-[10px] bg-[#FFFFFF] mt-12 mr-4 font-bold text-[#3E5677]"
            onClick={handleChangePicture}>
           Change Picture
           </button>
          </div>
        </div>
        </div>
        <h2 className="mt-10 font-nunito text-[24px] font-normal leading-[32.74px] text-left">
            Change Information
        </h2>
         <div className="mt-8 flex gap-8 border-b bg-white rounded-[10px]">
        <button
          className={`text-lg pb-2 ${
            activeTab === "basic"
              ? "border-b-4 border-[#3E5677] text-[#3E5677]"
              : "text-gray-600"
          }`}
          onClick={() => dispatch(setActiveTab("basic"))}
        >
          Basic Details
        </button>

        <button
          className={`text-lg pb-2 ${
            activeTab === "personal"
              ? "border-b-4 border-[#3E5677] text-[#3E5677]"
              : "text-gray-600"
          }`}
          onClick={() => dispatch(setActiveTab("personal"))}
        >
          Personal Details
        </button>
      </div>
       <div className="profile-info bg-white p-4 mt-4 rounded-lg shadow-md">
        {activeTab === "basic" && (
          <div>
           <BasicDetails/>
          </div>
        )}

        {activeTab === "personal" && (
          <div>
            <PersonalDetailsForm/>
          </div>
        )}
      </div>
 <div/>
    </div>
  )
}

export default profile
