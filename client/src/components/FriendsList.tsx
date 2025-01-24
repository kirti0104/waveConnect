import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';

interface Friend  {
  id: number;
  receiverFullName: string;
  receiverEmail: string;
  status: 'pending' | 'accepted';
  profileImage: string; 
};

interface Props{
    limit?:number;
}


const FriendsList:React.FC<Props> = ({limit}) => {
    const userId=Cookies.get('userId')
 
    const fetchFriends=async()=>{
        const response=await axios.get(`http://localhost:8004/app/fetchFriends/${userId}`)
         console.log('API Response:', response.data);
        return response.data.request;
    }
    const { isLoading,  error, data:friends,refetch } = useQuery<Friend[]>({
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

  const friendsToDisplay = limit ? friends?.slice(0, limit) : friends;
return (
  <div className="friends-list mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
    {friendsToDisplay?.map((friend: Friend) => (
      <div
        key={friend.id}
        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
            <img
              src={friend.profileImage || '/defaultProfile.png'}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{friend.receiverFullName}</h3>
            <p className="text-sm text-gray-500">{friend.receiverEmail}</p>
          </div>
        </div>

        <div
          className={`${
            friend.status === 'accepted' ? 'bg-[#49A15C]' : 'bg-[#B18D4B]'
          } w-24 rounded-full flex items-center justify-center`}
        >
          <div className="text-sm text-white px-2 py-1">
            {friend.status === 'accepted' ? 'Accepted' : 'Pending'}
          </div>
        </div>
      </div>
    ))}
  </div>
);

}

export default FriendsList