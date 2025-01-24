import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import FriendsList from '../components/FriendsList';
import Search from '../components/Search';

type Friend = {
  id: number;
  receiverFullName: string;
  receiverEmail: string;
  status: 'pending' | 'accepted';
  profileImage: string; 
};

const Friends = () => {

    const userId=Cookies.get('userId')
      const [searchQuery, setSearchQuery] = useState('');

    const fetchFriends=async()=>{
        const response=await axios.get(`http://localhost:8004/app/fetchFriends/${userId}`)
         console.log('API Response:', response.data);
        return response.data.request;
    }
    const { isLoading,  error, refetch } = useQuery<Friend[]>({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

   useEffect(()=>{
     refetch();
  },[refetch])

    if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load friend requests</div>;
  }

  const handleSearch=(query:string)=>{
     setSearchQuery(query)
  }


  return (
    <div className='friends'>
       <div className='heading flex '>
         <img src='/backArrow.png' className='h-8 w-10'/>
         <h2 className='text-2xl text-left mb-8 '>Friends</h2>   
        </div>
    <div className=" border-b bg-white rounded-[10px] p-8 shadow-lg d-flex">
        <div className="relative flex items-center justify-between w-full p-4 bg-white-50 ">
         <Search onSearch={handleSearch}/>
            <Link to="/app/inviteFriend">
           <button type="button" className="w-60 h-[50px] px-6 py-2 text-white text-xl bg-[#3E5677] hover:bg-[#2E4155] rounded-md text-sm" >
          Invite Friend
           </button>
         </Link>
       </div> 
      
           <div >    
            <FriendsList/>
            </div>      
      </div>
    </div>
  )
}

export default Friends
