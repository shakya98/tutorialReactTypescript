import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@mui/material/Badge";
import { Wrapper } from "./App.styles";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);
  return <div className="App">Hellow</div>;
};

export default App;
