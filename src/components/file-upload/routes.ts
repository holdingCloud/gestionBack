import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import { loggerAdapter } from "../../config";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadService } from "../../service/file-upload.service";
import { FileUploadMiddleware } from '../../middleware/file-upload.middleware';
import { TypeMiddleware } from "../../middleware/type.middleware";

export class FileUploadRoutes {


    static get routes(): Router {

        const router = Router();

        const fileUploadService = new FileUploadService();

        const controller = new FileUploadController(fileUploadService);

        loggerAdapter.info('[Routes] uploadfileRoutes');

        //Middleware
        router.use([AuthMiddleware.validateJWT,
        FileUploadMiddleware.containFiles,
        TypeMiddleware.validTypes(['users', 'products', 'categories'])]);
        //Routes
        router.post('/single/:type', controller.uploadFile);
        //router.post('/multiple/:type', controller.uploadMultipleFile);


        return router;

    }

}