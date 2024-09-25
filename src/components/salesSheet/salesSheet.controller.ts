import { Request, Response } from 'express';
import { CustomError } from "../../errors/custom.error";
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SalesSheetService } from '../../service';
import { CreateSalesSheetDto } from './dto/create-salesSheet.dto';
import { UpdateSalesSheetDto } from './dto/update-salesSheet.dto';


export class SalesSheetController {

    constructor(
        public readonly salesSheetService: SalesSheetService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    };

    public getSalesSheet = (req: Request, res: Response) => {

        const [error, paginationDto] = PaginationDto.create({ ...req.query });
        if (error) return res.status(400).json({ error });

        this.salesSheetService.getSalesSheets(paginationDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));

    }

    public createSalesSheet = (req: Request, res: Response) => {

        const [error, createSalesSheetDto] = CreateSalesSheetDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.salesSheetService.createSalesSheet(createSalesSheetDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    public updateSalesSheet = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateSalesSheetDto] = UpdateSalesSheetDto.update({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        this.salesSheetService.updateSalesSheet(updateSalesSheetDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

}