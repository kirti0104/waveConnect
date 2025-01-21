import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  waveMessage: string;
  waveUserName: string;

}
interface Wave{
  name:string
}
interface Comment{
  comment:string;
  Wave:Wave;
}

const CustomModal: React.FC<ModalProps> = ({isOpen,onClose,waveMessage, waveUserName,}) => {
    const waveId=localStorage.getItem('waveId')
    const[comment,setComment]=useState('');
    const[showCommentBox,setShowCommentBox]=useState(false);

   const mutation = useMutation({
  mutationFn: async (comment: string) => {
    const waveId = localStorage.getItem('waveId');
    const response = await axios.post(
      `http://localhost:8004/app/addComment/${waveId}`,
      { comment: comment }
    );
    return response.data;
  },
  onSuccess: (data) => {
   
    console.log('Comment added successfully:', data);
    refetch();
  },
  onError: (error: AxiosError) => {
    console.error('Error submitting comment:', error);
  },
});

    const fetchComments=async()=>{
         const response=await axios.get(`http://localhost:8004/app/getComments/${waveId}`)
         return response.data.comments;
    }

      const { data: comments, isLoading, error ,refetch} = useQuery({
       queryKey: ['comments'], 
      queryFn: fetchComments, 
      });
   if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Failed to load waves.</div>;
  }
    const handleAddComment=()=>{
       setShowCommentBox(true)
    }
    const handleSubmit=()=>{
      mutation.mutate(comment)
        setShowCommentBox(false)
        
    }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Wave Modal"
      className="bg-white  rounded-lg w-1/2 h-[500px] mx-auto mt-10"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="profile-rectangle flex bg-[#C5B084] w-auto h-[100px] m-4 relative rounded-lg">
          <div className="absolute right-[80%] transform translate-x-1/4 mt-7">
            <img src="/user.jpg" alt="Profile"className="w-21 h-21 rounded-full border-2 border-white" />
          </div>
          <div className='ml-[200px] mt-[50px]'>
              <h3 className="text-sm font-bold text-white">{waveUserName} Wave</h3>
              <h5 className="text-sm font-bold text-white">@{waveUserName}Wave</h5>
          </div>      
        </div>
        <div className='flex w-full h-[100px] '>
            <div className='flex-1 p-6 border-r border-gray-300'>
               <h2 className='font-bold text-lg'>Message</h2>
            <p className="mt-4 text-lg text-gray-700">{waveMessage}</p>

            </div>
            <div className='flex-1 p-6'>    
                <img src='/food.jpeg'className='w-[200px] h-[100px] object-cover'/>    
            </div>
        </div>
       <button onClick={handleAddComment}
          className="mt-8 px-4 py-2 bg-[#3E5677] ms-4 text-white rounded-md hover:bg-[#9A6A00]">
          Add Comment
        </button>
        {showCommentBox &&(
            <div className='mt-2 w-[300px] ms-20'>
              <textarea value={comment}
                onChange={(e)=>setComment(e.target.value)}
                placeholder='Add your comment'
                className="w-full p-2 border border-gray-300 rounded-md mt-2">
              </textarea>
              <button onClick={handleSubmit}
                className="mt-2 px-4 py-2 bg-[#BB8E01] text-white rounded-md hover:bg-[#9A6A00]">
               submit
              </button>
            </div>
        )}
         {comments.map((comment: Comment, index: number) => (
      <div key={index} className="py-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <p className="text-gray-700 font-bold ms-2">{comment.Wave.name}:</p>
          <p className="text-gray-700 ms-2">{comment.comment}</p>
        </div>
        <div className="flex space-x-2 mr-2">
          {/* Edit Button */}
          <button className="text-blue-500 hover:text-blue-700" >
            Edit
          </button>
          {/* Delete Button */}
          <button className="text-red-500 hover:text-red-700" >
            Delete
          </button>
        </div>
      </div>
    ))}
      <div className="mt-16 mr-4 flex justify-end mb-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
