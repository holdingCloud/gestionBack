import { typePosition } from "@prisma/client";

export class CreateEmployeeDto {


    protected constructor(
        public rut: string,
        public fullname: string,
        public email: string,
        public salary: number,
        public hireDate: string,
        public city: string,
        public address: string,
        public type: typePosition,
        public available: boolean
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateEmployeeDto?] {

        const { rut, fullname, email, salary, hireDate, city, address, type, available } = object;


        if (!rut) return ['Falta Rut empleado'];
        if (!fullname) return ['Falta nombre de empleado'];
        if (!email) return ['Falta email'];
        if (!salary && typeof salary === "number") return ['Falta sueldo de empleado'];
        if (!hireDate) return ['Falta fecha de ingreso'];
        if (!city) return ['Falta ciudad'];
        if (!address) return ['Falta dirección'];
        if (!type) return ['Selecciona una opción']

        return [undefined, new CreateEmployeeDto(rut, fullname, email, salary, hireDate, city, address, type, available)];

    }

}