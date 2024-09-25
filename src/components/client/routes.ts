import { Router } from "express";
import { ClientController } from "./client.controller";
import { loggerAdapter } from "../../config";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import { ClientService } from "../../service";


export class ClientRouter {

    static get routes(): Router {

        const router = Router();

        const clientService = new ClientService();

        const controller = new ClientController(clientService);

        loggerAdapter.info('[Routes] productRoutes');

        router.get('/', [AuthMiddleware.validateJWT], controller.getClients);
        router.post('/', [AuthMiddleware.validateJWT], controller.createClient);
        router.put('/:id', [AuthMiddleware.validateJWT], controller.updateClient);
        router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteClient);


        return router;

    }

}