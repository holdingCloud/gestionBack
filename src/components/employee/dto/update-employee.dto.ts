import { typePosition } from "@prisma/client";
import { CreateEmployeeDto } from "./create-employee.dto";

export class UpdateEmployeeDto extends CreateEmployeeDto {

    private constructor(
        public readonly id: number,
        public rut: string,
        public fullname: string,
        public email: string,
        public salary: number,
        public hireDate: string,
        public city: string,
        public address: string,
        public type: typePosition,
        public available: boolean) {
        super(rut, fullname, email, salary, hireDate, city, address, type, available);
    }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.rut) returnObj.rut = this.rut;
        if (this.fullname) returnObj.fullName = this.fullname;
        if (this.email) returnObj.email = this.email;
        if (this.salary) returnObj.salary = this.salary;
        if (this.hireDate) returnObj.hireDate = this.hireDate;
        if (this.city) returnObj.city = this.city;
        if (this.address) returnObj.address = this.address;


        return returnObj;
    }

    static update(object: { [key: string]: any }): [string?, UpdateEmployeeDto?] {

        const { id, rut, fullname, email, salary, hireDate, city, address, type, available } = object;

        if (!id || isNaN(Number(id))) {
            return ['debe ser un número valido'];
        }

        this.create({ rut, fullname, email, salary, hireDate, city, address, type, available });

        return [undefined, new UpdateEmployeeDto(id, rut, fullname, email, salary, hireDate, city, address, type, available)];
    }

}