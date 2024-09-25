import { CreateSalesSheetDto } from './create-salesSheet.dto';

export class UpdateSalesSheetDto extends CreateSalesSheetDto {

    private constructor(
        public readonly id: number,
        public employeeId: number,
        public date: string,
        public description: string,
        public billId: number
    ) {
        super(employeeId, date, description, billId)
    }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.employeeId) returnObj.employeeId = this.employeeId;
        if (this.date) returnObj.date = this.date;
        if (this.description) returnObj.description = this.description;
        if (this.billId) returnObj.billId = this.billId;

        return returnObj;
    }

    static update(object: { [key: string]: any }): [string?, UpdateSalesSheetDto?] {

        const { id, employeeId, date, description, billId } = object;

        if (!id || isNaN(Number(id))) {
            return ['debe ser un número valido'];
        }

        this.create({ employeeId, date, description, billId });

        return [undefined, new UpdateSalesSheetDto(id, employeeId, date, description, billId)];
    }

}