import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HeaderOrder.module.css";
import { useStore } from "../../store/MainStore";
import { Fragment } from "react";
import OrderModal from "./OrderModal";
import { observer } from "mobx-react-lite";
import { IOrder } from "../../models/Order";
import { IProduct } from "../../models/Product";

const HeaderOrder = ({
  order,
  quantity,
  open,
  onEdit,
  onDelete,
  onOpen,
  onClose,
  onSubmit,
}: {
  order: IOrder;
  quantity: number;
  open: boolean;
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (order: IOrder) => void;
}) => {
  return (
    <Fragment>
      {open && (
        <OrderModal
          isOpen={open}
          order={order}
          onClose={onClose}
          onEdit={onEdit}
          onDelete={onDelete}
          onSubmit={onSubmit}
        />
      )}
      <button
        className={styles.button}
        onClick={onOpen}
        disabled={order.items.length === 0}
      >
        <FontAwesomeIcon icon="shopping-cart" className={styles.icon} />
        Meu Pedido <span className={styles.badge}>{quantity}</span>
      </button>
    </Fragment>
  );
};

export default observer(() => {
  const { orderStore, productStore } = useStore();
  const { order, quantityItems, isOpen, setIsOpen, onDelete, onSubmitOrder } =
    orderStore;
  const { setSeletectedProduct, setIsOpen: setProductIsOpen } = productStore;

  const handleEdit = (product: IProduct) => {
    setSeletectedProduct(product);
    setIsOpen(false);
    setProductIsOpen(true);
  };

  const handleDelete = (product: IProduct) => {
    onDelete(product);
    if (order.items.length === 0) {
      setIsOpen(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (order: IOrder) => {
    onSubmitOrder(order);
    setIsOpen(false);
  };

  return (
    <HeaderOrder
      order={order}
      quantity={quantityItems}
      open={isOpen}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onOpen={handleOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
});
