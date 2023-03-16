import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import { BasicLayout } from "../layouts/BasicLayout";
import { Error404 } from '../pages';
import { Error500 } from '../pages';


const routes =[
    ...routesAdmin,
    ...routesClient,
    {
        path:'*',
        layout : BasicLayout,
        component: Error404,
    },
]
export default routes