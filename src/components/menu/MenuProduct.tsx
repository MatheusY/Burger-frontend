import { Row } from "react-bootstrap";
import classes from "./MenuProduct.module.css";
import { IProduct } from "../../models/Product";

interface MenuProductProps {
  product: IProduct;
  onClick: (product: IProduct) => void;
}

const MenuProduct = (props: MenuProductProps) => {
  return (
    <div
      className={`${classes.product}`}
      onClick={() => props.onClick(props.product)}
    >
      <Row>
        <b className={classes.text}>{props.product.name}</b>
      </Row>
      <Row>
        <p className={classes.text}>{props.product.description}</p>
      </Row>
      <Row>
        <p className={classes.text}>{`R$${props.product.price}`}</p>
      </Row>
    </div>
  );
};

export default MenuProduct;
