import { Router } from "express";
import { loggerAdapter } from "../../config";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import { EmployeeService } from "../../service";
import { EmployeeController } from "./employee.controller";


export class EmployeeRouter {

    static get routes(): Router {

        const router = Router();

        const employeeService = new EmployeeService();

        const controller = new EmployeeController(employeeService);

        loggerAdapter.info('[Routes] productRoutes');

        router.get('/', [AuthMiddleware.validateJWT], controller.getEmployees);
        router.post('/', [AuthMiddleware.validateJWT], controller.createEmployee);
        router.put('/:id', [AuthMiddleware.validateJWT], controller.updateEmployee);
        router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteEmployee);


        return router;

    }

}