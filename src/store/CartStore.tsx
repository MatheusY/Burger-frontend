import { ICart } from "../models/Cart";
import { IProduct } from "../models/Product";

const KEY_CACHE_CART = "menuCart";

export class CartStore {
  cart: ICart;

  constructor() {
    const valueCart = localStorage.getItem(KEY_CACHE_CART);
    this.cart = valueCart ? JSON.parse(valueCart) : ({ items: [] } as ICart);
  }

  getCart = (): ICart => {
    return this.cart;
  };

  getQuantityByProductId = (productId: number): number => {
    const items = this.cart.items?.filter(
      (item) => item.product.id === productId
    );
    return items.length > 0 ? items[0].quantity : 0;
  };

  add = (product: IProduct, quantity: number): void => {
    const items = this.cart.items?.filter(
      (item) => item.product.id === product.id
    );
    if (items.length > 0) {
      items[0].quantity = quantity;
    } else {
      this.cart.items.push({ product, quantity });
    }
    localStorage.setItem(KEY_CACHE_CART, JSON.stringify(this.cart));
  };
}
