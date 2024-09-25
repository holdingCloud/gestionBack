import { Router } from "express";
import { loggerAdapter } from "../../config";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import { SalesSheetService } from "../../service";
import { SalesSheetController } from "./salesSheet.controller";



export class ClientRouter {

    static get routes(): Router {

        const router = Router();

        const salesSheetService = new SalesSheetService();

        const controller = new SalesSheetController(salesSheetService);

        loggerAdapter.info('[Routes] SalesSheetRoutes');

        router.get('/', [AuthMiddleware.validateJWT], controller.getSalesSheet);
        router.post('/', [AuthMiddleware.validateJWT], controller.createSalesSheet);
        router.put('/:id', [AuthMiddleware.validateJWT], controller.updateSalesSheet);


        return router;

    }

}