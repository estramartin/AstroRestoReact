import { BasicLayout, ClientLayout } from "../layouts";
import {
  SelectTable,
  Categories,
  Products,
  Cart,
  OrderHistory,
} from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: BasicLayout,
    component: SelectTable,
  },
  {
    path: "/client/:tableNumber",
    layout: ClientLayout,
    component: Categories,
  },
  {
    path: "/client/:tableNumber/:idCategory",
    layout: ClientLayout,
    component: Products,
  },
  {
    path: "/client/:tableNumber/cart",
    layout: ClientLayout,
    component: Cart,
  },
  {
    path: "/client/:tableNumber/orders",
    layout: ClientLayout,
    component: OrderHistory,
  },
];
export default routesClient;
