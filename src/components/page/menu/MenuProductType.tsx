import { Col, Container, Row } from "react-bootstrap";
import { IProduct } from "../../../models/Product";
import MenuProduct from "./MenuProduct";
import classes from "./MenuProductType.module.css";

const MenuProductType = ({
  title,
  products,
  onAddToCart,
}: {
  title: string;
  products: IProduct[];
  onAddToCart: (product: IProduct) => void;
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="d-flex justify-content-center">{title}</h2>
        </Col>
      </Row>
      <div className={classes.product}>
        {products.map((product) => (
          <MenuProduct
            key={product.id}
            product={product}
            onClick={onAddToCart}
          />
        ))}
      </div>
    </Container>
  );
};

export default MenuProductType;
