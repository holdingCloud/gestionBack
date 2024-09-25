
export class CreateClientDto {


    protected constructor(
        public fullname: string,
        public city: string,
        public address: string,
        public zone: string,
        public phone: string,
        public email: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateClientDto?] {

        const { fullname, city, address, zone, phone, email } = object;


        if (!fullname) return ['Falta nombre de cliente'];
        if (!city) return ['Falta ciudad'];
        if (!address) return ['Falta dirección'];
        if (!zone) return ['Falta la zona'];
        if (!phone && typeof phone === "string") return ['Falta telefono'];
        if (!email) return ['Falta email'];

        return [undefined, new CreateClientDto(fullname, city, address, zone, phone, email)];

    }

}