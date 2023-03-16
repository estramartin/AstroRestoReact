import { AdminLayout } from "../layouts";
import {
  UserAdmin,
  CategoriesAdmin,
  ProductsAdmin,
  TablesAdmin,
  OrdersAdmin,
  TableDetailAdmin,
  PaymentHistory,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: OrdersAdmin,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UserAdmin,
  },
  {
    path: "/admin/categories",
    layout: AdminLayout,
    component: CategoriesAdmin,
  },
  {
    path: "/admin/products",
    layout: AdminLayout,
    component: ProductsAdmin,
  },
  {
    path: "/admin/tables",
    layout: AdminLayout,
    component: TablesAdmin,
  },
  {
    path: "/admin/table/:tab_id",
    layout: AdminLayout,
    component: TableDetailAdmin,
  },
  {
    path: "/admin/payment-history",
    layout: AdminLayout,
    component: PaymentHistory,
  },
];
export default routesAdmin;
