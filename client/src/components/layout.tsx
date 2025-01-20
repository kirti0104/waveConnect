// src/components/Layout.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const Layout: React.FC = () => {
  const user=useSelector((state:RootState)=>state.user)
   
  return (
    <div className="flex h-screen w-full flex-row">
       <div  className=" sidebar bg-[#3E5677] w-[296px] h-screen " >
        <div className="appLogo mt-8 ms-20">
            <img src="/appLogo.png" alt="logo"/>
        </div>
        <ul className="text-white px-12 pt-4 space-y-4">
        <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
           <Link to="/dashboard" className="flex items-center gap-2">
             <img src="/dashboard.png" className="h-8 w-8" alt="Dashboard Icon" />
              <span>Dashboard</span>
              </Link>
             </li>
          <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
             <Link to="/profile/:userId" className="flex items-center gap-2">
            <img src="/linechart.png" className="h-8 w-8" alt="linechart Icon" />
            <span>My Profile</span>
            </Link>
         </li>
           <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
            <Link to="/preferences" className="flex items-center gap-2">
            <img src="/linechart.png" className="h-8 w-8" alt="linechart Icon" />
            <span>Preferences</span>
            </Link>
         </li>
           <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
             <Link to="/friends" className="flex items-center gap-2">
            <img src="/linechart.png" className="h-8 w-8" alt="linechart Icon" />
            <span>Friends</span>
            </Link>
         </li>
            <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
              <Link to="/createWaves" className="flex items-center gap-2">
              <img src="/linechart.png" className="h-8 w-8" alt="linechart Icon" />
            <span>Create Waves</span>
              </Link>
            
         </li>
            <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
              <Link to="/changePassword" className="flex items-center gap-2">
            <img src="/linechart.png" className="h-8 w-8" alt="linechart Icon" />
            <span>Change Password</span>
            </Link>
         </li>
        </ul>
         <div className="logoutButton text-white absolute bottom-14 ms-16 flex gap-4">
          <Link to="/login" className="flex items-center gap-2">
          <img src="/logoutArrow.png " className="h-6 w-6"/>
          <span>Log Out</span>
          </Link>
            
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-screen flex flex-col">
         <div className="header bg-white h-[89px] border-b border-gray-300">
           <div className="flex justify-between items-center h-full px-6"> 
             <div className="flex items-center space-x-4 ml-auto">
               <img src="/user.jpg" alt="Profile" className="w-12 h-12 rounded-full border border-gray-300" />
               <div className="flex flex-col text-right">
                  <span className="text-sm font-medium text-gray-500">Good Afternoon</span>
                  <span className="text-base font-semibold text-gray-800">{user.firstName} {user.lastName}</span>
                </div>
             </div>
            </div>
          </div>
          <div className="max-h-[80vh] overflow-y-auto p-8 bg-[#EEF5F6] main-content">
           <Outlet />
           </div>
      </div>
    </div>
  );
};

export default Layout;
