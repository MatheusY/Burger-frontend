import { useState } from "react";
import { IProduct } from "../../models/Product";
import React from "react";
import styles from "./ProductModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProductModalProps {
  isOpen: boolean;
  product: IProduct;
  onClose: () => void;
  onSubmit: (product: IProduct, quantity: number) => void;
}

const ProductModal = (props: ProductModalProps) => {
  const { product, isOpen, onClose, onSubmit } = props;
  const [subtotal, setSubtotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  if (!isOpen) {
    return <React.Fragment />;
  }

  const reduce = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setSubtotal(quantity * product.price);
    }
  };

  const increase = () => {
    const currentQuantity = quantity + 1;
    setQuantity(currentQuantity);
    setSubtotal(currentQuantity * product.price);
  };

  return (
    <div className={styles.background} onClick={onClose}>
      <div
        className={styles.panel}
        onClick={(event: any): void => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h5 className={styles.title}>{product.name}</h5>
          <button className={styles.close_button} onClick={onClose}>
            <FontAwesomeIcon icon="times" className={styles.close_icon} />
          </button>
        </div>
        <div className={styles.body}>
          <p>{product.description}</p>
        </div>
        <div className={styles.footer}>
          <div className={`btn-group ${styles.group_quantity}`}>
            <button
              type="button"
              className={`btn btn-light ${styles.button}`}
              onClick={reduce}
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
      </div>
    </div>
  );
};
export default ProductModal;
