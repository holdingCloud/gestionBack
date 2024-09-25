export class SearchEmployeeDto {

    protected constructor(
        public name: string,
        public rut: string,
        public email: string,
        public city: string,
        public available: boolean
    ) { }

    static search(object: { [key: string]: any }): [string?, SearchEmployeeDto?] {

        const { name, rut, email, city, available } = object;


        return [undefined, new SearchEmployeeDto(name, rut, email, city, available)]


    }



}