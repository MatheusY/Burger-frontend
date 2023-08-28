import { useEffect, useState } from "react";
import { IProduct } from "../../models/Product";
import React from "react";
import styles from "./ProductModal.module.css";
import { useStore } from "../../store/MainStore";
import Modal from "../common/Modal";
import { observer } from "mobx-react-lite";

const ProductModal = ({
  isOpen,
  product,
  initialQuantity,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  product: IProduct;
  initialQuantity: number;
  onClose: () => void;
  onSubmit: (product: IProduct, quantity: number) => void;
}) => {
  const [subtotal, setSubtotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(initialQuantity);
    setSubtotal(initialQuantity * product.price);
  }, [initialQuantity, product, setQuantity, setSubtotal]);

  if (!isOpen) {
    return <React.Fragment />;
  }

  const isMinimun = quantity === 1;

  const reduce = () => {
    if (quantity > 0) {
      const currentQuantity = quantity - 1;
      setQuantity(currentQuantity);
      setSubtotal(currentQuantity > 0 ? currentQuantity * product.price : 0);
    }
  };

  const increase = () => {
    const currentQuantity = quantity + 1;
    setQuantity(currentQuantity);
    setSubtotal(currentQuantity * product.price);
  };

  return (
    <Modal title={product.name} onClose={onClose}>
      <div className={styles.body}>
        <p>{product.description}</p>
      </div>
      <div className={styles.footer}>
        <div className={`btn-group ${styles.group_quantity}`}>
          <button
            type="button"
            className={`btn btn-light ${styles.button}`}
            onClick={reduce}
            disabled={isMinimun}
          >
            -
          </button>
          <div className={styles.quantity}>{quantity}</div>
          <button
            type="button"
            className={`btn btn-light ${styles.button}`}
            onClick={increase}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className={`btn btn-primary ${styles.submit}`}
          onClick={() => onSubmit(product, quantity)}
        >
          <div className={styles.submit_text}>
            <div>Adicionar ao pedido:</div>
            {`R$${subtotal.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}`}
          </div>
        </button>
      </div>
    </Modal>
  );
};
export default observer(
  ({
    isOpen,
    product,
    onClose,
    onSubmit,
  }: {
    isOpen: boolean;
    product: IProduct;
    onClose: () => void;
    onSubmit: (product: IProduct, quantity: number) => void;
  }) => {
    const { cartStore } = useStore();
    const { getQuantityByProductId } = cartStore;
    const [quantityInCart, setQuantityInCart] = useState(0);

    useEffect(() => {
      setQuantityInCart(getQuantityByProductId(product.id));
    }, [setQuantityInCart, getQuantityByProductId, product]);

    return (
      <ProductModal
        isOpen={isOpen}
        product={product}
        initialQuantity={quantityInCart}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );
  }
);
