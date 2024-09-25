import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService, LogService } from '../../service';
import { loggerAdapter } from '../../config';





export class Authroutes {


    static get routes(): Router {

        const router = Router();

        // const log = new LogService();

        const authService = new AuthService();

        const controller = new AuthController(authService);

        loggerAdapter.info('[Routes] authRoutes');
        // Definir las rutas
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);
        router.get('/refreshToken', controller.checkUserStatus);
        router.get('/keepSession/:id', controller.keepSession);



        return router;
    }


}