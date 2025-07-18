import React, { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;  
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value); 
  };

  return (
    <div className="search-container mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search friends..."
        className="p-2 border border-gray-300 rounded-md w-full"
      />
    </div>
  );
};

export default Search;
