import { Fragment } from "react";
import { IItem } from "../../models/Item";
import styles from "./OrderItem.module.css";
import { IProduct } from "../../models/Product";

const OrderItem = ({
  item,
  onEdit,
  onDelete,
}: {
  item: IItem;
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
}) => {
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  const handleEdit = () => {
    onEdit(product);
  };

  const handleDelete = () => {
    onDelete(product);
  };

  return (
    <Fragment>
      <div className={styles.item_description}>
        <p>{`${quantity}x ${product.name}`}</p>
        <p>{`R$${subtotal.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}`}</p>
      </div>
      <div className={styles.item_action}>
        <button className={styles.edit} onClick={handleEdit}>
          Editar
        </button>
        <button className={styles.remove} onClick={handleDelete}>
          Remover
        </button>
      </div>
      <hr />
    </Fragment>
  );
};

export default OrderItem;
