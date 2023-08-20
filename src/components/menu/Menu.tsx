import { useEffect, useState } from "react";
import { useStore } from "../../store/MainStore";
import { IProduct } from "../../models/Product";
import MenuProductType from "./MenuProductType";
import classes from "./Menu.module.css";

const Menu = () => {
  const { productStore } = useStore();
  const { fetchProducts } = productStore;
  const [products, setProducts] = useState([] as IProduct[]);

  useEffect(() => {
    fetchProducts().then((response) => setProducts(response));
  }, [fetchProducts]);

  return (
    <div className={`container-fluid ${classes.menu}`}>
      <h1 className="col-md-12 d-flex justify-content-center">Menu</h1>
      <MenuProductType
        title="Lanches"
        products={products.filter((product) => product.productType === "FOOD")}
      />
      <MenuProductType
        title="Bebidas"
        products={products.filter((product) => product.productType === "DRINK")}
      />
    </div>
  );
};

export default Menu;
