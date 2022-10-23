import { useState } from "react";
import { useQuery } from "react-query";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import { Wrapper, StyledButton } from ".././App.styles";
import Item from ".././Componants/Item/Item";
import SearchBar from ".././Componants/SearchAndFilters/ShopPage/SearchBar";
import FilterButtons from ".././Componants/SearchAndFilters/ShopPage/FilterButtons";
import CartBtn from "../Componants/Cart/CartBtn";
import { CartItemType } from "../App";

type Props = {
  cartItems: CartItemType[];
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleRemoveFromCart: (id: number) => void;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("http://127.0.0.1:8000/api/retrieve-data")).json();

const Shop: React.FC<Props> = ({
  cartItems,
  cartOpen,
  setCartOpen,
  handleAddToCart,
  handleRemoveFromCart,
}) => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterItem, setFilterItem] = useState(0);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;

  return (
    <Wrapper>
      <SearchBar setSearchTerm={setSearchTerm} />
      <FilterButtons setFilterItem={setFilterItem} />

      <Grid container spacing={3}>
        {data
          ?.filter((item) => {
            if (
              filterItem == 0 &&
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return item;
            } else if (
              item.type_number == filterItem &&
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
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

export default Shop;
