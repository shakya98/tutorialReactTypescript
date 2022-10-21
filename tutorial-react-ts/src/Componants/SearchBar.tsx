import React from "react";
import { CartItemType } from "../App";

type Props = {
  item: CartItemType;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const Item: React.FC<Props> = ({ item, setSearchTerm }) => (
    <input
    type="text"
    placeholder="Search.."
    onChange={(event) => {
      setSearchTerm(event.target.value);
    }}
  />
);

export default Item;
