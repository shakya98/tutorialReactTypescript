import React from "react";
import { CartItemType } from "../../App";
import { StyledButton } from "../.././App.styles";
import Badge from "@material-ui/core/Badge";
import Drawer from "@material-ui/core/Drawer";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Cart from "../.././Componants/Cart/Cart";

type Props = {
  cartItems: CartItemType[];
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleRemoveFromCart: (id: number) => void;
};

const getTotalItems = (items: CartItemType[]) =>
  items.reduce((ack: number, item) => ack + item.amount, 0);

const CartBtn: React.FC<Props> = ({
  cartItems,
  cartOpen,
  setCartOpen,
  handleAddToCart,
  handleRemoveFromCart,
}) => (
  <>
    <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
      <Cart
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
      />
    </Drawer>
    <StyledButton onClick={() => setCartOpen(true)}>
      <Badge badgeContent={getTotalItems(cartItems)} color="error">
        <AddShoppingCartIcon />
      </Badge>
    </StyledButton>
  </>
);

export default CartBtn;
