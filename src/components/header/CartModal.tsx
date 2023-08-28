import { Fragment } from "react";
import Modal from "../common/Modal";
import { ICart } from "../../models/Cart";
import CartItem from "./CartItem";
import styles from "./CartModal.module.css";
import { IProduct } from "../../models/Product";

const CartModal = ({
  isOpen,
  cart,
  onClose,
  onEdit,
  onDelete,
}: {
  isOpen: boolean;
  cart: ICart;
  onClose: () => void;
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
}) => {
  if (!isOpen) {
    return <Fragment />;
  }

  return (
    <Modal title="Meus Pedidos" onClose={onClose} className={styles.modal}>
      <div className={styles.body}>
        {cart.items.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Modal>
  );
};

export default CartModal;
