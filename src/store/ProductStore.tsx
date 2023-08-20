import HttpDatasource, { MethodType } from "../datasource/Datasource";
import { IProduct } from "../models/Product";

export class ProductStore {
  products: IProduct[] = [];

  readonly findProductsDS = new HttpDatasource<IProduct[]>(
    MethodType.GET,
    "/api/products"
  );

  fetchProducts = (): Promise<IProduct[]> => {
    return this.findProductsDS.execute();
  };
}
