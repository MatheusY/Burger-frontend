import { Row } from "react-bootstrap";
import classes from "./MenuProduct.module.css";

export interface MenuProductProps {
  name: string;
  description: string;
  price: number;
}

const MenuProduct = (props: MenuProductProps) => {
  return (
    <div className={`${classes.product}`}>
      <Row>
        <b className={classes.text}>{props.name}</b>
      </Row>
      <Row>
        <p className={classes.text}>{props.description}</p>
      </Row>
      <Row>
        <p className={classes.text}>{`R$${props.price}`}</p>
      </Row>
    </div>
  );
};

export default MenuProduct;
