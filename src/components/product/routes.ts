import { Router } from "express";
import { ProductService } from "../../service/product.service";
import { ProductsController } from "./product.controller";
import { loggerAdapter } from "../../config";
import { AuthMiddleware } from "../../middleware/auth.middleware";

export class ProductRouter {

    static get routes(): Router {

        const router = Router();

        const productService = new ProductService();

        const controller = new ProductsController(productService);

        loggerAdapter.info('[Routes] productRoutes');

        router.get('/', [AuthMiddleware.validateJWT], controller.getProducts);
        router.post('/', [AuthMiddleware.validateJWT], controller.createProduct);
        router.put('/:id', [AuthMiddleware.validateJWT], controller.updateProduct);
        router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteProduct);


        return router;

    }

}