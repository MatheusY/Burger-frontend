import { useState } from "react";
import { IProduct } from "../../models/Product";
import React from "react";

interface ProductModalProps {
  isOpen: boolean;
  product: IProduct;
  onClose: () => void;
  onSubmit: (product: IProduct, quantity: number) => void;
}

const ProductModal = (props: ProductModalProps) => {
  const { product, isOpen, onClose, onSubmit } = props;
  const [subtotal, setSubtotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  if (!isOpen) {
    return <React.Fragment />;
  }

  const reduce = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setSubtotal(quantity * product.price);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
    setSubtotal(quantity * product.price);
  };

  return (
    <div className="modal fade" id="productModal" role="dialong">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="productModalTitle">
              {product.name}
            </h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{product.description}</p>
          </div>
          <div className="modal-footer">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={reduce}
              >
                -
              </button>
              <button type="button" className="btn btn-secondary">
                <p>{quantity}</p>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={increase}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSubmit(product, quantity)}
            >
              <p>Adicionar ao pedido</p> <p>{`R$${subtotal}`}</p>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
