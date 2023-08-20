import axios from "axios";
import { IURLParameters, buildUrl } from "../urls/UrlUtils";

export type DatasourceMapper<T> = (obj: any) => T;
export const NoOp = (o: any) => o;
export enum MethodType {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export default class HttpDatasource<T> {
  readonly method: MethodType;
  readonly urlPattern: string;
  readonly mapper: DatasourceMapper<T>;

  constructor(
    method: MethodType,
    urlPattern: string,
    mapper: DatasourceMapper<T> = NoOp
  ) {
    this.method = method;
    this.urlPattern = urlPattern;
    this.mapper = mapper;
  }

  execute = async (
    urlParemeters: IURLParameters = {},
    data: any = undefined
  ): Promise<T> => {
    const url = buildUrl(this.urlPattern, urlParemeters, encodeURIComponent);
    return this.executeRequest(this.method, url, data);
  };

  async executeRequest(method: string, url: string, data: any): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const promise = await axios.request({
          method,
          url,
          data,
          headers: {
            "Content-Type": "application/json",
          },
        });
        resolve(promise.data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
