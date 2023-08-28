import { configure, makeAutoObservable } from "mobx";
import { ICart } from "../models/Cart";
import { IProduct } from "../models/Product";

const KEY_CACHE_CART = "menuCart";

configure({
  enforceActions: "observed",
});

export class CartStore {
  cart: ICart;
  quantityItems: number;
  isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
    const valueCart = localStorage.getItem(KEY_CACHE_CART);
    this.cart = valueCart ? JSON.parse(valueCart) : ({ items: [] } as ICart);
    this.quantityItems = this.cart.items.length;
  }

  getQuantityByProductId = (productId: number): number => {
    const items = this.cart.items?.filter(
      (item) => item.product.id === productId
    );
    return items.length > 0 ? items[0].quantity : 0;
  };

  setQuantityItems = (quantity: number): void => {
    this.quantityItems = quantity;
  };

  setIsOpen = (isOpen: boolean): void => {
    this.isOpen = isOpen;
  };

  add = (product: IProduct, quantity: number): void => {
    if (quantity === 0) {
      this.cart.items = this.cart.items.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      const items = this.cart.items?.filter(
        (item) => item.product.id === product.id
      );
      if (items.length > 0) {
        items[0].quantity = quantity;
      } else {
        this.cart.items.push({ product, quantity });
      }
    }
    this.setQuantityItems(this.cart.items.length);
    localStorage.setItem(KEY_CACHE_CART, JSON.stringify(this.cart));
  };

  onDelete = (product: IProduct): void => {
    this.cart.items = this.cart.items?.filter(
      (item) => item.product.id !== product.id
    );
    this.setQuantityItems(this.cart.items.length);
    localStorage.setItem(KEY_CACHE_CART, JSON.stringify(this.cart));
  };
}
