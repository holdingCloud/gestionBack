
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateEmployeeDto, SearchEmployeeDto, UpdateEmployeeDto } from '../components/employee/dto';
import { prisma } from "../database";
import { CustomError } from "../errors/custom.error";

export class EmployeeService {

    constructor() {

    }


    public createEmployee = async (createEmployeeDto: CreateEmployeeDto) => {

        const existEmployee = await prisma.employees.findFirst({
            where: { rut: createEmployeeDto.rut }
        });
        if (existEmployee) throw CustomError.badRequest('El Employeee ya existe');

        try {

            createEmployeeDto.available = true;

            const response = await prisma.employees.create({
                data: createEmployeeDto
            });

            return {
                message: 'Employeee creado con exito',
                statusCode: 'success',
                payload: { ...response }
            };

        } catch (error) {

            throw CustomError.internalServer(`Error al crear Employeee ${error}`);
        }

    }

    public getEmployees = async (paginationDto: PaginationDto, searchEmployeeDto: SearchEmployeeDto) => {

        try {

            let doSearch = false;
            for (let value of Object.values(searchEmployeeDto)) {
                if (value != undefined) {
                    doSearch = true;
                }
            }
            const search = (doSearch) ? {
                OR: [{
                    fullname: {
                        startsWith: searchEmployeeDto.name
                    },
                    rut: {
                        startsWith: searchEmployeeDto.rut
                    },
                    email: {
                        startsWith: searchEmployeeDto.email
                    },
                    city: {
                        startsWith: searchEmployeeDto.city
                    },
                }],
                available: searchEmployeeDto.available || true
            } : {
                available: true
            };


            const [Employees, count] = await prisma.$transaction([
                prisma.employees.findMany({
                    where: search,
                    ...paginationDto,
                    orderBy: [
                        {
                            id: 'desc'
                        }
                    ]
                }),
                prisma.employees.count()
            ])

            if (!Employees) throw CustomError.badRequest('No hay Employeees en la base de datos');

            return {
                Employees,
                count
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    public updateEmployee = async (updateEmployeeDto: UpdateEmployeeDto) => {

        const Employee = await this.getEmployeeById(updateEmployeeDto.id);
        if (!Employee) throw CustomError.badRequest(`Error el producto con id ${updateEmployeeDto.id} no existe`);

        try {

            const EmployeeUpdate = await prisma.employees.update({
                where: {
                    id: updateEmployeeDto.id
                },
                data: updateEmployeeDto
            });

            return {
                message: 'Employeee actualizado exitosamente',
                product: {
                    ...EmployeeUpdate
                }
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    public deleteEmployee = async (id: number) => {

        try {
            const Employee = await this.getEmployeeById(id);
            if (!Employee) throw CustomError.badRequest(`Error el empleado con el id ${id} no existe`);

            await prisma.employees.update({
                where: { id },
                data: {
                    available: false
                }
            });

            return {
                message: 'Employeee eliminado',
                success: true,
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    private getEmployeeById = async (id: number) => {


        const Employee = await prisma.employees.update({
            where: { id },
            data: {
                available: false
            }
        })


        return Employee;
    }






}