import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HeaderCart.module.css";
import { useStore } from "../../store/MainStore";
import { Fragment } from "react";
import CartModal from "./CartModal";
import { observer } from "mobx-react-lite";
import { ICart } from "../../models/Cart";
import { IProduct } from "../../models/Product";

const HeaderCart = ({
  cart,
  quantity,
  open,
  onEdit,
  onDelete,
  onOpen,
  onClose,
}: {
  cart: ICart;
  quantity: number;
  open: boolean;
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
  onOpen: () => void;
  onClose: () => void;
}) => {
  return (
    <Fragment>
      {open && (
        <CartModal
          isOpen={open}
          cart={cart}
          onClose={onClose}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      <button
        className={styles.button}
        onClick={onOpen}
        disabled={cart.items.length === 0}
      >
        <FontAwesomeIcon icon="shopping-cart" className={styles.icon} />
        Meu Pedido {quantity}
      </button>
    </Fragment>
  );
};

export default observer(() => {
  const { cartStore, productStore } = useStore();
  const { cart, quantityItems, isOpen, setIsOpen, onDelete } = cartStore;
  const { setSeletectedProduct, setIsOpen: setProductIsOpen } = productStore;

  const handleEdit = (product: IProduct) => {
    setSeletectedProduct(product);
    setIsOpen(false);
    setProductIsOpen(true);
  };

  const handleDelete = (product: IProduct) => {
    onDelete(product);
    if (cart.items.length === 0) {
      setIsOpen(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <HeaderCart
      cart={cart}
      quantity={quantityItems}
      open={isOpen}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onOpen={handleOpen}
      onClose={handleClose}
    />
  );
});
