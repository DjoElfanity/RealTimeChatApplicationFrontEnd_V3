import { useState } from "react";

import React from "react";

interface SearchBarProps {
  onSearchSubmit: (searchTerm: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchSubmit,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-[5px]">
      <div className="flex flex-grow items-center bg-white text-text border border-background-medium rounded-xl focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent px mx-1">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          className="pl-3 pr-8 w-full p-1.5 bg-transparent placeholder:text-[#709CE6] focus:outline-none text-[#709CE6]"
        />
      </div>
    </form>
  );
};

export default SearchBar;
