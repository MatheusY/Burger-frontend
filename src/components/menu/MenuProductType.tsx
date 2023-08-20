import { Col, Container, Row } from "react-bootstrap";
import { IProduct } from "../../models/Product";
import MenuProduct from "./MenuProduct";
import classes from "./MenuProductType.module.css";

interface MenuProductTypeProps {
  title: string;
  products: IProduct[];
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
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </Container>
  );
};

export default MenuProductType;
