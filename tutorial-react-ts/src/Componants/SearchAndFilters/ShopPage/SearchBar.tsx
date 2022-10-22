import React from "react";

type Props = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<Props> = ({ setSearchTerm }) => (
  <input
    type="text"
    placeholder="Search.."
    onChange={(event) => {
      setSearchTerm(event.target.value);
    }}
  />
);

export default SearchBar;
