import { Router } from "express";
import {
    Authroutes,
    ClientRouter,
    EmployeeRouter,
    FileUploadRoutes,
    ImageRoutes,
    ProductRouter,
    UserRoutes,
} from "../components";
import { loggerAdapter } from "../config";

export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        loggerAdapter.info('[Routes] AppRoutes');

        router.use('/auth', Authroutes.routes);
        router.use('/user', UserRoutes.routes);
        router.use('/product', ProductRouter.routes);
        router.use('/client', ClientRouter.routes);
        router.use('/employee', EmployeeRouter.routes);
        router.use('/upload', FileUploadRoutes.routes);
        router.use('/images', ImageRoutes.routes);


        return router;
    }

}