import { makeAutoObservable } from "mobx";
import HttpDatasource, { MethodType } from "../datasource/Datasource";
import { IProduct } from "../models/Product";

export class ProductStore {
  products: IProduct[] = [];
  selectedProduct: IProduct = {} as IProduct;
  isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  readonly findProductsDS = new HttpDatasource<IProduct[]>(
    MethodType.GET,
    "/api/products"
  );

  fetchProducts = (page?: number, size?: number): Promise<IProduct[]> => {
    return this.findProductsDS.execute({ page, size });
  };

  getSelectedProduct = () => this.selectedProduct;

  setSeletectedProduct = (product: IProduct) => {
    this.selectedProduct = product;
  };

  setIsOpen = (isOpen: boolean) => {
    this.isOpen = isOpen;
  };
}
