
export class CreateSalesSheetDto {


    protected constructor(
        public employeeId: number,
        public date: string,
        public description: string,
        public billId: number,

    ) { }


    static create(object: { [key: string]: any }): [string?, CreateSalesSheetDto?] {

        const { employeeId, date, description, billId } = object;


        if (!date) return ['Falta la fecha'];
        if (!description) return ['Falta la descripcion'];
        if (!billId) return ['Falta la cuenta']



        return [undefined, new CreateSalesSheetDto(employeeId, date, description, billId)];

    }



}