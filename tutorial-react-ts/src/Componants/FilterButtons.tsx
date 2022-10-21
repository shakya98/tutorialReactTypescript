import React from "react";
import { Wrapper } from "../App.styles";

type Props = {
  setFilterItem: React.Dispatch<React.SetStateAction<number>>;
};

const FilterButtons: React.FC<Props> = ({ setFilterItem }) => (
  <Wrapper className="filterWrapper">
    <input
      type="button"
      value="All"
      onClick={() => {
        setFilterItem(0);
      }}
    />
    <input
      type="button"
      value="Pizza"
      onClick={() => {
        setFilterItem(1);
      }}
    />
    <input
      type="button"
      value="Pasta"
      onClick={() => {
        setFilterItem(2);
      }}
    />
    <input
      type="button"
      value="Desserts"
      onClick={() => {
        setFilterItem(3);
      }}
    />
    <input
      type="button"
      value="Beverages"
      onClick={() => {
        setFilterItem(4);
      }}
    />
    <input
      type="button"
      value="Starters"
      onClick={() => {
        setFilterItem(6);
      }}
    />
  </Wrapper>
);

export default FilterButtons;
