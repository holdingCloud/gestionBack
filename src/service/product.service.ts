
import { PaginationDto } from '../common/dto/pagination.dto';
import { prisma } from "../database";
import { CustomError } from "../errors/custom.error";
import { CreateProductDto } from '../components/product/dto/create-product.dto';
import { UpdateProductDto } from '../components/product/dto/update-product.dto';
import { SearchProductDto } from '../components/product/dto/search-product.dto';

export class ProductService {

    constructor() {

    }


    public createProduct = async (createProductDto: CreateProductDto) => {

        const existProduct = await prisma.products.findFirst({
            where: { name: createProductDto.name }
        });

        if (existProduct) throw CustomError.badRequest('El producto ya existe');

        try {

            const response = await prisma.products.create({
                data: createProductDto
            });

            return {
                message: 'Producto creado con exito',
                statusCode: 'success',
                payload: { ...response }
            };

        } catch (error) {

            throw CustomError.internalServer(`Error al crear producto ${error}`);
        }

    }

    public getProducts = async (paginationDto: PaginationDto, searchProductDto: SearchProductDto) => {

        try {

            const { name = "" } = searchProductDto;

            const where = (name !== "") ? {
                OR: [{
                    name: {
                        startsWith: name
                    }
                }],
            } : {};

            const [products, count] = await prisma.$transaction([
                prisma.products.findMany({
                    where,
                    ...paginationDto, orderBy: [
                        {
                            id: 'desc'
                        }
                    ]
                }),
                prisma.products.count()
            ])

            if (!products) throw CustomError.badRequest('No hay productos en la base de datos');

            return {
                products,
                count
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    public updateProduct = async (updateProductDto: UpdateProductDto) => {

        const product = await this.getProductById(updateProductDto.id);
        if (!product) throw CustomError.badRequest(`Error el producto con id ${updateProductDto.id} no existe`);

        try {

            const productUpdate = await prisma.products.update({
                where: {
                    id: updateProductDto.id
                },
                data: updateProductDto
            });

            return {
                message: 'Producto actualizado exitosamente',
                product: {
                    ...productUpdate
                }
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    public deleteProduct = async (id: number) => {

        try {
            const product = await this.getProductById(id);
            if (!product) throw CustomError.badRequest(`Error el producto con el id ${id} no existe`);

            await prisma.products.delete({
                where: { id }
            });

            return {
                message: 'Producto eliminado',
                succes: true,
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    private getProductById = async (id: number) => {


        const product = await prisma.products.update({
            where: { id },
            data: {
                available: false
            }
        })


        return product;
    }



}