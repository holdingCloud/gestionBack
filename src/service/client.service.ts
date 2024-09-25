
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateClientDto, UpdateClientDto } from '../components/client/dto/';
import { prisma } from "../database";
import { CustomError } from "../errors/custom.error";

export class ClientService {

    constructor() {

    }


    public createClient = async (createClientDto: CreateClientDto) => {

        const existClient = await prisma.clients.findFirst({
            where: { fullname: createClientDto.fullname }
        });

        if (existClient) throw CustomError.badRequest('El cliente ya existe');

        try {

            const response = await prisma.clients.create({
                data: createClientDto
            });

            return {
                message: 'Cliente creado con exito',
                statusCode: 'success',
                payload: { ...response }
            };

        } catch (error) {

            throw CustomError.internalServer(`Error al crear cliente ${error}`);
        }

    }

    public getClients = async (paginationDto: PaginationDto) => {

        try {



            //  const where = (name !== "") ? {
            //    OR: [{
            //        name: {
            //            startsWith: name
            //        }
            //    }],
            //} : {};

            const [clients, count] = await prisma.$transaction([
                prisma.clients.findMany({
                    where: {
                        available: true
                    },
                    ...paginationDto,
                    orderBy: [
                        {
                            id: 'desc'
                        }
                    ]
                }),
                prisma.clients.count()
            ])

            if (!clients) throw CustomError.badRequest('No hay clientes en la base de datos');

            return {
                clients,
                count
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    public updateClient = async (updateClientDto: UpdateClientDto) => {

        const client = await this.getClientById(updateClientDto.id);
        if (!client) throw CustomError.badRequest(`Error el Cliente con id ${updateClientDto.id} no existe`);

        try {

            const clientUpdate = await prisma.clients.update({
                where: {
                    id: updateClientDto.id
                },
                data: updateClientDto
            });

            return {
                message: 'Cliente actualizado exitosamente',
                payload: {
                    ...clientUpdate
                }
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    public deleteClient = async (id: number) => {

        try {
            const client = await this.getClientById(id);
            if (!client) throw CustomError.badRequest(`Error el cliente con el id ${id} no existe`);

            await prisma.clients.update({
                where: { id },
                data: {
                    available: false
                }
            });

            return {
                message: 'Cliente eliminado',
                success: true,
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    private getClientById = async (id: number) => {


        const client = await prisma.clients.findFirst({
            where: { id },
        })


        return client;
    }






}