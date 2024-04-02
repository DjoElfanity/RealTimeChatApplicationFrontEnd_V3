import { useState } from "react";
import { IoMdFunnel } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Term de recherche:", searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-[20px]">
      <div className="flex flex-grow items-center bg-background-leger text-text border border-background-medium rounded-xl focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent relative">
        {/* Icône à gauche de l'input */}
        <IoSearchOutline className="absolute left-3 text-[#709CE6]" />
        <input
          type="text"
          placeholder="Search ... "
          value={searchTerm}
          onChange={handleChange}
          className="pl-10 pr-8 w-full p-1.5 bg-transparent placeholder:text-[#709CE6] focus:outline-none text-[#709CE6]"
        />
        {/* Bouton ou icône à la droite de l'input */}
        <button type="submit" className="absolute right-3 p-1.5 text-[#709CE6]">
          <IoMdFunnel />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
