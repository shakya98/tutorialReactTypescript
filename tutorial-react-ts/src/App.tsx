import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Wrapper } from "./App.styles";
import CartBtn from "./Componants/Cart/CartBtn";
import NavBar from "./Componants/NavigationBar/NavBar";
import ErrorPage from "./Pages/Error";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import SingleProduct from "./Pages/SingleProduct";

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

const cartFromLS = JSON.parse(localStorage.getItem("cartItems") || "[]")

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(cartFromLS as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);
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

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  return (
    <>
      <Wrapper>
        <CartBtn
          cartItems={cartItems}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </Wrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="navbar" element={<NavBar />} />
        <Route
          path="shop"
          element={
            <Shop
              cartItems={cartItems}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route path="shop/:productId" element={<SingleProduct handleAddToCart={handleAddToCart} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
