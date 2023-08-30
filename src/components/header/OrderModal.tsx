import { Fragment } from "react";
import Modal from "../common/Modal";
import { IOrder } from "../../models/Order";
import OrderItem from "./OrderItem";
import styles from "./OrderModal.module.css";
import { IProduct } from "../../models/Product";

const CartModal = ({
  isOpen,
  order,
  onClose,
  onEdit,
  onDelete,
  onSubmit,
}: {
  isOpen: boolean;
  order: IOrder;
  onClose: () => void;
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
  onSubmit: (order: IOrder) => void;
}) => {
  if (!isOpen) {
    return <Fragment />;
  }

  return (
    <Modal title="Meus Pedidos" onClose={onClose} className={styles.modal}>
      <div className={styles.body}>
        {order.items.map((item) => (
          <OrderItem
            key={item.product.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <div>
        <div className={styles.total}>
          <b>Total:</b>
          <b>{`R$${order.items
            .reduce(
              (partialSum, item) =>
                partialSum + item.quantity * item.product.price,
              0
            )
            .toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}`}</b>
        </div>
        <button
          type="button"
          className={`btn btn-primary ${styles.submit}`}
          onClick={() => onSubmit(order)}
        >
          Fechar pedido
        </button>
      </div>
    </Modal>
  );
};

export default CartModal;
