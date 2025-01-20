import React from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Friend = {
  id: number;
  receiverFullName: string;
  receiverEmail: string;
  status: 'pending' | 'accepted';
  profileImage: string; // Assume this is a URL string
};

const Friends = () => {

     const userId=Cookies.get('userId')
    const fetchFriends=async()=>{
        const response=await axios.get(`http://localhost:8004/app/fetchFriends/${userId}`)
         console.log('API Response:', response.data);
        return response.data.request;
    }
    const { isLoading,  error, data:friends } = useQuery<Friend[]>({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });
    if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load friend requests</div>;
  }


  return (
    <div className='friends'>
       <div className='heading flex '>
         <img src='/backArrow.png' className='h-8 w-10'/>
         <h2 className='text-2xl text-left mb-8 '>Friends</h2>   
        </div>
    <div className=" border-b bg-white rounded-[10px] p-8 shadow-lg d-flex">
        <div className="relative flex items-center justify-between w-full p-4 bg-white-50 ">
          <input type="text"  placeholder="Search" className="w-[354px] h-[50px] rounded-full border border-gray-400 bg-gray-100
               text-gray-800 placeholder-gray-600 outline-none px-4 text-sm
               focus:ring-2 focus:ring-gray-300 transition-all" />
            <Link to="/inviteFriend">
           <button type="button" className="w-60 h-[50px] px-6 py-2 text-white text-xl bg-[#3E5677] hover:bg-[#2E4155] rounded-md text-sm" >
          Invite Friend
           </button>
         </Link>
       </div> 
      
           <div className="friend-list grid grid-cols-2 gap-6 mt-8">
           
        {friends?.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            {/* Left Side: Profile Picture and Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
                <img
                  src={friend.profileImage || '/defaultProfile.png'}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-700">{friend.receiverFullName}</h3>
                <p className="text-sm text-gray-500">{friend.receiverEmail}</p>
              </div>
            </div>

            <div className={`${friend.status==='accepted'? 'bg-[#49A15C]':'bg-[#B18D4B]'} w-30 rounded-full`}>
            <div className="text-sm  text-white px-2 ">
              {friend.status === 'accepted' ? 'Accepted' : 'Pending'}
            </div>
            </div>
          </div>
        ))}
      </div>


       
        </div>
    </div>
  )
}

export default Friends
