import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import WaveModal from '../components/waveModal';

interface User{
   firstName: string;
    lastName: string;
    userProfile: string;
}

interface Wave {
  id: number;
  message: string;
  User:User
}

const Dashboard = () => {

   const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWave, setSelectedWave] = useState<Wave | null>(null);

  // Fetch waves from backend
  const fetchWaves = async () => {
    try {
      const response = await axios.get('http://localhost:8004/app/getWaves');
       console.log("-----",response.data.waves)
      return response.data.waves; 
     
    } catch (error) {
      console.error('Error fetching waves:', error);
      throw new Error('Error fetching waves');
    }
  };

  // Using TanStack Query to fetch waves
  const { data: waves, isLoading, error } = useQuery<Wave[],Error>({
     queryKey: ['waves'], 
    queryFn: fetchWaves, 
  });

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Failed to load waves.</div>;
  }

    const openModal = (wave: Wave) => {
    const waveId=wave.id;
    localStorage.setItem('waveId',waveId.toString())
    setSelectedWave(wave);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWave(null);
  };
 

  return (
    <div className="dashboard">
      <div className="mt-8 border-b bg-white rounded-[10px] p-8 shadow-lg">
        <h1 className="text-xl text-[#292929]">Making Waves</h1>
        <div className="waves-list mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {waves?.map((wave: Wave) => (
           <div key={wave.id} 
           className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between border-b border-gray-300"
           onClick={() => openModal(wave)}>
  
        <div className="flex-shrink-0">
        <img src={ wave.User.userProfile || 'https://via.placeholder.com/150?text=No+Image'}
         alt="Profile"className="w-12 h-12 rounded-full object-cover"/>
         </div>
     
        <div className="flex-1 ml-4 border-r border-gray-300 pr-4">
                <h2 className="text-lg text-[#BB8E01] font-bold">
                  @{wave.User.firstName} {wave.User.lastName}
                </h2>
    <p className="text-sm text-gray-700">{wave.message}</p>
    <p className="text-[#BB8E01] cursor-pointer hover:underline">Follow</p>
  </div>
</div>

          ))}
        </div>
      </div>
      {selectedWave && (
        <WaveModal
          isOpen={isModalOpen}
          onClose={closeModal}
          waveMessage={selectedWave.message}
          waveUserName={`${selectedWave.User.firstName} ${selectedWave.User.lastName}`}
         
        />
      )}
    </div>
  );
};

export default Dashboard;
