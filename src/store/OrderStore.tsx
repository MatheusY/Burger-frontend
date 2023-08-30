import { configure, makeAutoObservable } from "mobx";
import { IOrder } from "../models/Order";
import { IProduct } from "../models/Product";
import HttpDatasource, { MethodType } from "../datasource/Datasource";

const KEY_CACHE_CART = "menuCart";

const EMPTY_ORDER: IOrder = {
  items: [],
  orderStatus: "IN_PROGRESS",
  customer: {
    id: 1,
    name: "matheus",
    email: "matheus.matsubara@gmail.com",
  },
};

configure({
  enforceActions: "observed",
});

export class OrderStore {
  order: IOrder;
  quantityItems: number;
  isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
    const valueCart = localStorage.getItem(KEY_CACHE_CART);
    this.order = valueCart ? JSON.parse(valueCart) : EMPTY_ORDER;
    this.quantityItems = this.order.items.length;
  }

  readonly submitOrderDS = new HttpDatasource<void>(
    MethodType.POST,
    "/api/orders"
  );

  getQuantityByProductId = (productId: number): number => {
    const items = this.order.items?.filter(
      (item) => item.product.id === productId
    );
    return items.length > 0 ? items[0].quantity : 1;
  };

  setQuantityItems = (quantity: number): void => {
    this.quantityItems = quantity;
  };

  setIsOpen = (isOpen: boolean): void => {
    this.isOpen = isOpen;
  };

  add = (product: IProduct, quantity: number): void => {
    if (quantity === 0) {
      this.order.items = this.order.items.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      const items = this.order.items?.filter(
        (item) => item.product.id === product.id
      );
      if (items.length > 0) {
        items[0].quantity = quantity;
        items[0].subtotal = quantity * items[0].product.price;
      } else {
        this.order.items.push({
          product,
          quantity,
          subtotal: product.price * quantity,
        });
      }
    }
    this.setQuantityItems(this.order.items.length);
    localStorage.setItem(KEY_CACHE_CART, JSON.stringify(this.order));
  };

  onDelete = (product: IProduct): void => {
    this.order.items = this.order.items?.filter(
      (item) => item.product.id !== product.id
    );
    this.setQuantityItems(this.order.items.length);
    localStorage.setItem(KEY_CACHE_CART, JSON.stringify(this.order));
  };

  onSubmitOrder = (order: IOrder): void => {
    this.submitOrderDS
      .execute(
        {},
        {
          ...order,
          orderStatus: "IN_PROGRESS",
        }
      )
      .then(() => {
        this.order = EMPTY_ORDER;
        localStorage.setItem(KEY_CACHE_CART, JSON.stringify(EMPTY_ORDER));
        this.setQuantityItems(0);
      });
  };
}
