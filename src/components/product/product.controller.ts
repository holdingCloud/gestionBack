import { Request, Response } from 'express';
import { CustomError } from "../../errors/custom.error";
import { ProductService } from "../../service/product.service";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';



export class ProductsController {

    constructor(
        public readonly productService: ProductService,
    ) {

    }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    };


    public getProducts = (req: Request, res: Response) => {


        const [errorSearch, searchProductDto] = SearchProductDto.create({ ...req.query });
        const [error, paginationDto] = PaginationDto.create({ ...req.query });
        if (errorSearch || error) return res.status(400).json({ error });

        this.productService.getProducts(paginationDto!, searchProductDto!)
            .then(products => res.json(products))
            .catch(error => this.handleError(error, res));

    }

    public createProduct = (req: Request, res: Response) => {

        const [error, createProductDto] = CreateProductDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.productService.createProduct(createProductDto!)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));

    }

    public updateProduct = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateProductDto] = UpdateProductDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        this.productService.updateProduct(updateProductDto!)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }

    public deleteProduct = (req: Request, res: Response) => {
        const id = +req.params.id;
        this.productService.deleteProduct(id)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }



}