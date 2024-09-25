import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateSalesSheetDto } from "../components/salesSheet/dto/create-salesSheet.dto";
import { UpdateSalesSheetDto } from "../components/salesSheet/dto/update-salesSheet.dto";
import { prisma } from "../database";
import { CustomError } from "../errors/custom.error";

export class SalesSheetService {

    public createSalesSheet = async (createSalesSheetDto: CreateSalesSheetDto) => {


        try {
            const response = await prisma.salesSheets.create({
                data: createSalesSheetDto
            });

            return {
                message: 'Hoja de ventas creada con exito',
                statusCode: 200,
                payload: { ...response }
            }
        } catch (error) {
            throw CustomError.internalServer(`Error al crear hoja de ventas ${error}`);
        }


    }

    public getSalesSheets = async (paginationDto: PaginationDto) => {


        try {

            const [salesSheets, count] = await prisma.$transaction([
                prisma.clients.findMany({
                    include: {
                        detailsSalesSheets: true
                    },
                    ...paginationDto,
                    orderBy: [
                        {
                            id: 'desc'
                        }
                    ]
                }),
                prisma.salesSheets.count()
            ]);

            if (!salesSheets) throw CustomError.badRequest('No hay hoja de ventas en la base de datos');

            return {
                salesSheets,
                count
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }


    }

    public updateSalesSheet = async (updateSalesSheetDto: UpdateSalesSheetDto) => {

        const salesSheet = await this.getSalesSheetById(updateSalesSheetDto.id);
        if (!salesSheet) throw CustomError.badRequest(`Error la hoja de venta con id ${updateSalesSheetDto.id} no existe`)
        try {

            const salesSheetUpdate = await prisma.salesSheets.update({
                where: {
                    id: updateSalesSheetDto.id
                },
                data: updateSalesSheetDto
            });

            return {
                message: 'Hoja de venta actualizado exitosamente',
                payload: {
                    ...updateSalesSheetDto
                }
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    private getSalesSheetById = async (id: number) => {

        const salesSheet = await prisma.salesSheets.findFirst({
            where: {
                id
            }
        });

        return salesSheet;

    }






}