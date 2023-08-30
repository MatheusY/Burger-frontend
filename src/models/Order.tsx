import { IItem } from "./Item";
import { IUser } from "./User";

type OrderStatus = "IN_PROGRESS" | "CONCLUDED" | "CANCELED";

export interface IOrder {
  items: IItem[];
  orderedDate?: Date;
  orderStatus: OrderStatus;
  customer: IUser;
}
