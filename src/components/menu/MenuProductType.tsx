import { Col, Container, Row } from "react-bootstrap";
import { IProduct } from "../../models/Product";
import MenuProduct from "./MenuProduct";
import classes from "./MenuProductType.module.css";

interface MenuProductTypeProps {
  title: string;
  products: IProduct[];
  onAddToCart: (product: IProduct) => void;
}

const MenuProductType = (props: MenuProductTypeProps) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="d-flex justify-content-center">{props.title}</h2>
        </Col>
      </Row>
      <div className={classes.product}>
        {props.products.map((product) => (
          <MenuProduct
            key={product.id}
            product={product}
            onClick={props.onAddToCart}
          />
        ))}
      </div>
    </Container>
  );
};

export default MenuProductType;
