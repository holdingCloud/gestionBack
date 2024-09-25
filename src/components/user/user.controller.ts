import { Request, Response } from 'express';
import { CustomError } from '../../errors/custom.error';
import { UserService } from '../../service/user.service';
import { RegisterUserDto, SearchUserDto, UpdateUserDto } from './dtos';
import { PaginationDto } from '../../common';


export class UserController {


    constructor(
        public readonly userService: UserService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    };

    //TODO: Agregar Pagination a getUsers
    public getUsers = (req: Request, res: Response) => {

        const [errorPagination, paginationDto] = PaginationDto.create({ ...req.query });
        const [errorSearch, searchUserDto] = SearchUserDto.search({ ...req.query });

        if (errorPagination) return res.status(400).json({ errorPagination });

        this.userService.getUsers(paginationDto!, searchUserDto!)
            .then(users => res.json(users))
            .catch(error => this.handleError(error, res));
    }

    public getUser = (req: Request, res: Response) => {

        const id = +req.params.id;
        this.userService.getUser(id)
            .then(menu => res.json(menu))
            .catch(error => this.handleError(error, res));

    }


    public createUser = (req: Request, res: Response) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.userService.createUser(registerUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));

    }

    public updateUser = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateUserDto] = UpdateUserDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        this.userService.updateUser(updateUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    public deleteUser = (req: Request, res: Response) => {
        const id = +req.params.id;
        this.userService.deleteUser(id)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    public changeStatus = (req: Request, res: Response) => {
        const id = +req.params.id;
        const { status } = req.body;

        this.userService.statusUser(id, status)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

}