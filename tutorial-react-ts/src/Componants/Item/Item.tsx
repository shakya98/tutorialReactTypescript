import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";
import { CartItemType } from "../../App";
import { Wrapper } from "../../App.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper className="itemWrapper">
    <img className="itemImg" src={item.image} alt={item.title} />
    <div className="itemDiv">
      <h3>{item.title}</h3>
      <h3>Rs {item.price}</h3>
      <p>{item.description}</p>
    </div>
    <Link to={`/shop/${item.id}`}>See Product</Link>
    <Button className="addToCartBtn" onClick={() => handleAddToCart(item)}>
      Add to Cart
    </Button>
  </Wrapper>
);

export default Item;
