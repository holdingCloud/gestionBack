import { Router } from "express";
import { UserService } from "../../service";
import { UserController } from "./user.controller";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import { loggerAdapter } from "../../config";

export class UserRoutes {


    static get routes(): Router {

        const router = Router();

        const userService = new UserService();


        const controller = new UserController(userService);

        loggerAdapter.info('[Routes] userRoutes');

        router.get('/', [AuthMiddleware.validateJWT], controller.getUsers);
        router.get('/:id', [AuthMiddleware.validateJWT], controller.getUser);

        router.post('/', [AuthMiddleware.validateJWT], controller.createUser);
        router.put('/:id', [AuthMiddleware.validateJWT], controller.updateUser);
        router.patch('/:id', [AuthMiddleware.validateJWT], controller.changeStatus);
        router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteUser);
        return router;

    }


}