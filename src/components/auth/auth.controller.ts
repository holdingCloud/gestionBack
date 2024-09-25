import { Request, Response } from 'express';
import { CustomError } from '../../errors/custom.error';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { AuthService } from '../../service';
import { loggerAdapter } from '../../config';



export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error' })
    }


    public registerUser = (req: Request, res: Response) => {

        loggerAdapter.info("[AuthController] registerUser");
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error })


        this.authService.registerUser(registerDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));

    }



    public loginUser = (req: Request, res: Response) => {

        loggerAdapter.info("[AuthController] loginUser");
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error })


        this.authService.loginUser(loginUserDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));

    }


    public checkUserStatus = (req: Request, res: Response) => {

        const authorization = req.header('Authorization');
        const token = authorization?.split(' ').at(1) || '';

        this.authService.checkStatus(token)
            .then((status) => res.json(status))
            .catch(error => this.handleError(error, res));

    }

    public keepSession = (req: Request, res: Response) => {

        const id = +req.params.id;

        this.authService.keepSession(id)
            .then((session) => res.json(session))
            .catch(error => this.handleError(error, res));

    }



}