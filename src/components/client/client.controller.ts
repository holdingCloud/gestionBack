import { Request, Response } from 'express';
import { CustomError } from "../../errors/custom.error";
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ClientService } from '../../service';
import { CreateClientDto, UpdateClientDto } from './dto';


export class ClientController {

    constructor(
        public readonly clientService: ClientService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    };

    public getClients = (req: Request, res: Response) => {

        const [error, paginationDto] = PaginationDto.create({ ...req.query });
        if (error) return res.status(400).json({ error });

        this.clientService.getClients(paginationDto!)
            .then(clients => res.json(clients))
            .catch(error => this.handleError(error, res));

    }

    public createClient = (req: Request, res: Response) => {

        const [error, createClientDto] = CreateClientDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.clientService.createClient(createClientDto!)
            .then(client => res.json(client))
            .catch(error => this.handleError(error, res));
    }

    public updateClient = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateClientDto] = UpdateClientDto.update({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        this.clientService.updateClient(updateClientDto!)
            .then(client => res.json(client))
            .catch(error => this.handleError(error, res));
    }

    public deleteClient = (req: Request, res: Response) => {
        const id = +req.params.id;
        this.clientService.deleteClient(id)
            .then(client => res.json(client))
            .catch(error => this.handleError(error, res));
    }
}