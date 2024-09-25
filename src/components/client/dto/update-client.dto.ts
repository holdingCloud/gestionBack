import { CreateClientDto } from "./create-client.dto";

export class UpdateClientDto extends CreateClientDto {

    constructor(
        public readonly id: number,
        public fullname: string,
        public city: string,
        public address: string,
        public zone: string,
        public phone: string,
        public email: string) {
        super(fullname, city, address, zone, phone, email);
    }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.fullname) returnObj.fullName = this.fullname;
        if (this.city) returnObj.city = this.city;
        if (this.address) returnObj.address = this.address;
        if (this.zone) returnObj.zone = this.zone;
        if (this.phone) returnObj.phone = this.phone;
        if (this.email) returnObj.email = this.email;

        return returnObj;
    }

    static update(object: { [key: string]: any }): [string?, UpdateClientDto?] {

        const { id, fullname, city, address, zone, phone, email } = object;

        if (!id || isNaN(Number(id))) {
            return ['debe ser un número valido'];
        }

        this.create({ fullname, city, address, zone, phone, email });

        return [undefined, new UpdateClientDto(id, fullname, city, address, zone, phone, email)];
    }

}