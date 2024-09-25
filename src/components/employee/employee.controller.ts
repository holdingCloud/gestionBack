import { Request, Response } from 'express';
import { CustomError } from "../../errors/custom.error";
import { PaginationDto } from '../../common/dto/pagination.dto';
import { EmployeeService } from '../../service';
import { CreateEmployeeDto, SearchEmployeeDto, UpdateEmployeeDto } from './dto';


export class EmployeeController {

    constructor(
        public readonly employeeService: EmployeeService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    };

    public getEmployees = (req: Request, res: Response) => {

        const [errorPagination, paginationDto] = PaginationDto.create({ ...req.query });
        const [errorSearch, searchEmployeeDto] = SearchEmployeeDto.search({ ...req.query });

        if (errorPagination) return res.status(400).json({ errorPagination });

        this.employeeService.getEmployees(paginationDto!, searchEmployeeDto!)
            .then(employees => res.json(employees))
            .catch(error => this.handleError(error, res));

    }

    public createEmployee = (req: Request, res: Response) => {


        const [error, createEmployeeDto] = CreateEmployeeDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.employeeService.createEmployee(createEmployeeDto!)
            .then(employee => res.json(employee))
            .catch(error => this.handleError(error, res));
    }

    public updateEmployee = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateEmployeeDto] = UpdateEmployeeDto.update({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        this.employeeService.updateEmployee(updateEmployeeDto!)
            .then(employee => res.json(employee))
            .catch(error => this.handleError(error, res));
    }

    public deleteEmployee = (req: Request, res: Response) => {
        const id = +req.params.id;
        this.employeeService.deleteEmployee(id)
            .then(employee => res.json(employee))
            .catch(error => this.handleError(error, res));
    }
}