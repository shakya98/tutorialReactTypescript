import { Button } from "@material-ui/core";
import { CartItemType } from "../../App";
import { Wrapper } from "../../App.styles";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper className="wrapperCartItem">
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: Rs{item.price}</p>
        <p>Total: Rs{(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} className="imgItem" />
  </Wrapper>
);

export default CartItem;
