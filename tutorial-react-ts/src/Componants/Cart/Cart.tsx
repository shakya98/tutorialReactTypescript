import CartItem from "./CartItem";
import { CartItemType } from "../../App";
import { Wrapper } from "../../App.styles";
import { Link } from "react-router-dom";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
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
      <h2>Total: LKR{calculateTotal(cartItems).toFixed(2)}</h2>
      <Link to="/checkout">Go to Checkout</Link>
    </Wrapper>
  );
};

export default Cart;
