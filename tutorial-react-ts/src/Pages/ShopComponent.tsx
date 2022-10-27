import { useState } from "react";
import { useQuery } from "react-query";
import { CartItemType } from "../App";
import Shop from "./Shop";

interface ShopCompProps {}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("http://127.0.0.1:8000/api/retrieve-data")).json();

const ShopComp: React.FC<ShopCompProps> = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

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
  return (
    <Shop
      cartItems={cartItems}
      cartOpen={cartOpen}
      setCartOpen={setCartOpen}
      handleAddToCart={handleAddToCart}
      handleRemoveFromCart={handleRemoveFromCart}
    />
  );
};

export default ShopComp;
