import { useState } from "react";
import { useQuery } from "react-query";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import { Wrapper, StyledButton } from "./App.styles";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";

export type CartItemType = {
  id: number;
  type_number: number;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("http://127.0.0.1:8000/api/retrieve-data")).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterItem, setFilterItem] = useState(0);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;

  return (
    <Wrapper>
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
      <input
        type="text"
        placeholder="Search.."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
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
      <Grid container spacing={3}>
        {data
          ?.filter((item) => {
            if (filterItem == 0){
              return item;
            } else if (item.type_number == filterItem) {
              return item;
            }
          })
          .map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
