import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../../store/MainStore";
import { IProduct } from "../../../models/Product";
import ProductsGrid from "./ProductsGrid";

const Products = ({
  products,
  onChange,
}: {
  products: IProduct[];
  onChange: () => void;
}) => {
  return <ProductsGrid products={products} />;
};

export default observer(() => {
  const { productStore } = useStore();
  const { fetchProducts } = productStore;
  const [products, setProducts] = useState([] as IProduct[]);

  useEffect(() => {
    fetchProducts(0, 10).then((data) => setProducts(data));
  }, []);

  const handleChange = () => {};
  return <Products products={products} onChange={handleChange} />;
});
