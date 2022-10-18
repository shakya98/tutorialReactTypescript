import Button from "@material-ui/core/Button";
import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { CartItemType } from "../App";
import { Wrapper } from "../App.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper className="itemWrapper">
    <img className="itemImg" src={item.image} alt={item.title} />
    <div className="itemDiv">
      <h3>{item.title}</h3>
      <h3>{item.price}</h3>
      <p>{item.description}</p>
    </div>
    <Button className="addToCartBtn" onClick={() => handleAddToCart(item)}>
      Add to Cart
    </Button>
  </Wrapper>
);

export default Item;
