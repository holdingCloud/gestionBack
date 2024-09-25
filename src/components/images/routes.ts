import { Router } from "express";
import { ImageController } from "./image.controller";
import { AuthMiddleware } from "../../middleware/auth.middleware";


export class ImageRoutes {

    static get routes(): Router {

        const router = Router();
        const controller = new ImageController();

        router.get('/:type/:img', [AuthMiddleware.validateJWT], controller.getImage);

        return router;
    }
}