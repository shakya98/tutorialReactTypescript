import { CartItemType } from "../App";
import CartItem from "../Componants/Cart/CartItem";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Checkout: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  return (
    <>
      <div>
        <div>
          <h2>Checkout</h2>
        </div>
        <div>
          <div>
            <div>
              <h3>Basic Information</h3>
            </div>
            <div>
              <div>
                <label>First Name</label>
                <input type="text" />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" />
              </div>
              <div>
                <label>Email</label>
                <input type="text" />
              </div>
              <div>
                <label>Contact</label>
                <input type="text" />
              </div>
              <div>
                <label>Order Notes</label>
                <input type="text" />
              </div>
              <div>
                <label>Schedule</label>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <h5>Delivery Information</h5>
            </div>
            <div>
              <div>
                <label>Address</label>
                <input type="text" />
              </div>
              <div>
                <label>Town</label>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3>Shopping Cart</h3>
          {cartItems.length === 0 ? <p>No items</p> : null}
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>

        <div>
          <div>
            <h3>Pickup / Delivery</h3>
          </div>
        </div>

        <div>
          <div>
            <h3>Card / Cash</h3>
          </div>
        </div>

        <div>
          <h2>Total: LKR{calculateTotal(cartItems).toFixed(2)}</h2>
        </div>

        <div>
          <div>
            <button type="submit">Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
