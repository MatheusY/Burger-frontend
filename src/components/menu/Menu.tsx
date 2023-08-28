import { useEffect, useState } from "react";
import { useStore } from "../../store/MainStore";
import { IProduct } from "../../models/Product";
import MenuProductType from "./MenuProductType";
import classes from "./Menu.module.css";
import React from "react";
import ProductModal from "./ProductModal";
import { observer } from "mobx-react-lite";

const Menu = ({
  product,
  products,
  isProductModalOpen,
  onAdd,
  onOpenProductModal,
  onCloseProductModal,
}: {
  product: IProduct;
  products: IProduct[];
  isProductModalOpen: boolean;
  onAdd: (product: IProduct, quantity: number) => void;
  onOpenProductModal: (product: IProduct) => void;
  onCloseProductModal: () => void;
}) => {
  return (
    <React.Fragment>
      <ProductModal
        isOpen={isProductModalOpen}
        product={product}
        onClose={onCloseProductModal}
        onSubmit={onAdd}
      />
      <div className={`container-fluid ${classes.menu}`}>
        <h1 className="col-md-12 d-flex justify-content-center">Menu</h1>
        <MenuProductType
          title="Lanches"
          products={products.filter(
            (product) => product.productType === "FOOD"
          )}
          onAddToCart={onOpenProductModal}
        />
        <MenuProductType
          title="Bebidas"
          products={products.filter(
            (product) => product.productType === "DRINK"
          )}
          onAddToCart={onOpenProductModal}
        />
      </div>
    </React.Fragment>
  );
};

export default observer(() => {
  const { productStore, cartStore } = useStore();
  const {
    isOpen,
    selectedProduct,
    fetchProducts,
    setSeletectedProduct,
    setIsOpen,
  } = productStore;
  const { add } = cartStore;
  const [products, setProducts] = useState([] as IProduct[]);

  useEffect(() => {
    fetchProducts().then((response) => setProducts(response));
  }, [fetchProducts]);

  const handleAdd = (product: IProduct, quantity: number) => {
    add(product, quantity);
    handleCloseProductModal();
  };

  const handleOpenProductModal = (product: IProduct) => {
    setSeletectedProduct(product);
    setIsOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsOpen(false);
  };

  return (
    <Menu
      product={selectedProduct}
      products={products}
      isProductModalOpen={isOpen}
      onAdd={handleAdd}
      onOpenProductModal={handleOpenProductModal}
      onCloseProductModal={handleCloseProductModal}
    />
  );
});
