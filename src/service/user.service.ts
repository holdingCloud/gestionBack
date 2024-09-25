
import { PaginationDto } from '../common/dto/pagination.dto';
import { RegisterUserDto, SearchUserDto, UpdateUserDto } from "../components/user/dtos";
import { bcryptAdapter } from "../config";
import { prisma } from "../database";
import { CustomError } from "../errors/custom.error";



export class UserService {


    constructor() {

    }

    public createUser = async (registerUserDto: RegisterUserDto) => {

        const existUser = await prisma.users.findFirst({
            where: { email: registerUserDto.email }
        })
        if (existUser) throw CustomError.badRequest('Usuario existente');

        try {
            const { password } = registerUserDto;

            // Encriptar la contraseña
            registerUserDto.password = bcryptAdapter.hash(password);
            registerUserDto.isActive = true;

            const response = await prisma.users.create({
                data: registerUserDto
            });

            return response;

        } catch (error) {
            throw new Error(`Error al crear usuario ${error}`)
        }

    }

    public getUsers = async (paginationDto: PaginationDto, searchUserDto: SearchUserDto) => {


        try {


            let doSearch = false;
            for (let value of Object.values(searchUserDto)) {
                if (value != undefined) {
                    doSearch = true;
                }
            }
            const search = (doSearch) ? {
                OR: [{
                    fullName: {
                        startsWith: searchUserDto.fullName
                    },
                    email: {
                        startsWith: searchUserDto.email
                    },
                }]
            } : {

            };

            console.log("search", search);

            const [users, count] = await prisma.$transaction([
                prisma.users.findMany({
                    where: search,
                    ...paginationDto, orderBy: [
                        {
                            id: 'desc'
                        }
                    ]
                }),
                prisma.users.count({
                    where: search
                })
            ]);


            if (!users) throw new Error(`No hay datos de usuario`);

            const showUser = users.map(user => {
                const { password, ...rest } = user;
                return rest;
            });

            return {
                users: [...showUser],
                count
            };
        } catch (error) {
            throw new Error(`error en el servicio de getUsers ${error}`)
        }

    }

    public getUser = async (id: number) => {

        try {
            const user = await this.getUserById(id);

            return user;
        } catch (error) {
            throw CustomError.badRequest('Error en el servicio getUserByID')
        }

    }

    public updateUser = async (updateUserDto: UpdateUserDto) => {


        const user = await this.getUserById(updateUserDto.id);
        if (!user) throw CustomError.badRequest(`Error el usuario con el id ${updateUserDto.id} no existe`);

        try {

            const { password } = updateUserDto;

            let saveData = {};

            if (password != "") {
                updateUserDto.password = bcryptAdapter.hash(password)
                saveData = updateUserDto;
            } else {
                const { password, ...rest } = updateUserDto;
                saveData = rest;
            }


            const userUpdated = await prisma.users.update({
                where: {
                    id: updateUserDto.id
                },
                data: saveData
            });



            return {
                message: 'Datos actualizados',
                users: {
                    ...userUpdated
                }
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public deleteUser = async (id: number) => {

        try {
            const user = await this.getUserById(id);
            if (!user) throw CustomError.badRequest(`Error el usuario con el id ${id} no existe`);

            await prisma.users.delete({
                where: { id }
            });

            return {
                message: 'Usuario eliminado',
                success: true,
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    public statusUser = async (id: number, status: boolean) => {

        try {
            const user = await this.getUserById(id);
            if (!user) throw CustomError.badRequest(`Error el usuario con el id ${id} no existe`);

            const userUpdated = await prisma.users.update({
                where: {
                    id: id
                },
                data: {
                    isActive: status
                }
            });



            return {
                message: `El estado del usuario a ${status} a sido actualizado`,
                users: {
                    ...userUpdated
                }
            }


        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    private getUserById = async (id: number) => {


        const user = await prisma.users.update({
            where: { id },
            data: {
                isActive: false
            }
        });

        return user;

    }



}