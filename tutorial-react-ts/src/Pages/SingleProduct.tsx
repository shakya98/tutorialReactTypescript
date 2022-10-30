import { Link, useParams } from "react-router-dom";
import { CartItemType } from "../App";
import { useQuery } from "react-query";
import Button from "@material-ui/core/Button";

interface SingleProductProps {
  handleAddToCart: (clickedItem: CartItemType) => void;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("http://127.0.0.1:8000/api/retrieve-data")).json();

const SingleProduct: React.FC<SingleProductProps> = ({ handleAddToCart }) => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const products = data;
  const { productId } = useParams();
  const product = products?.find((product) => product.id === Number(productId));
  return (
    <section>
      {product && (
        <>
          <h1>Single Prod</h1>
          <h2>{product?.title}</h2>
          <img src={product?.image} alt={product?.title} />
          <Button
            className="addToCartBtn"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
          <Link to="/shop"></Link>
        </>
      )}
    </section>
  );
};

export default SingleProduct;
