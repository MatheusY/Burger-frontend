import { useEffect, useState } from "react";
import { useStore } from "../../store/MainStore";
import { IProduct } from "../../models/Product";
import MenuProductType from "./MenuProductType";
import classes from "./Menu.module.css";
import React from "react";
import ProductModal from "./ProductModal";

const Menu = () => {
  const { productStore } = useStore();
  const { fetchProducts } = productStore;
  const [products, setProducts] = useState([] as IProduct[]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({} as IProduct);

  useEffect(() => {
    fetchProducts().then((response) => setProducts(response));
  }, [fetchProducts]);

  const handleOpenModalProduct = (product: IProduct) => {
    console.log("Open");
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(!isProductModalOpen);
  };

  const handleSubmitModalOpen = (product: IProduct, quantity: number) => {};

  return (
    <React.Fragment>
      <ProductModal
        isOpen={isProductModalOpen}
        product={selectedProduct}
        onClose={handleCloseProductModal}
        onSubmit={handleSubmitModalOpen}
      />
      <div className={`container-fluid ${classes.menu}`}>
        <h1 className="col-md-12 d-flex justify-content-center">Menu</h1>
        <MenuProductType
          title="Lanches"
          products={products.filter(
            (product) => product.productType === "FOOD"
          )}
          onAddToCart={handleOpenModalProduct}
        />
        <MenuProductType
          title="Bebidas"
          products={products.filter(
            (product) => product.productType === "DRINK"
          )}
          onAddToCart={handleOpenModalProduct}
        />
      </div>
    </React.Fragment>
  );
};

export default Menu;
