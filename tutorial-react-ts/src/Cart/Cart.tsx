import CartItem from "./CartItem";
import { CartItemType } from "../App";
import { Wrapper } from "../App.styles";
import Item from "../Item/Item";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <Wrapper className="cartDiv">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </Wrapper>
  );
};

export default Cart;
