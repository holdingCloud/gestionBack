export class UpdateProductDto {

    //TODO: Agregar erencia del createProductDto
    private constructor(
        public readonly id: number,
        public name: string,
        public description: string,
        public quantity: number,
        public img: string,
        public code: string,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.name) returnObj.name = this.name;
        if (this.description) returnObj.description = this.description;
        if (this.quantity) returnObj.quantity = this.quantity;
        if (this.img) returnObj.img = this.img;
        if (this.code) returnObj.code = this.code;

        return returnObj;
    }

    static create(object: { [key: string]: any }): [string?, UpdateProductDto?] {

        const { id, name, description, quantity, img, code } = object;

        if (!id || isNaN(Number(id))) {
            return ['debe ser un número valido'];
        }
        if (!name) return ['Falta nombre de producto'];
        if (!description) return ['Falta descripcion'];
        if (!quantity) return ['Falta stock del producto'];
        if (!img) return ['Falta imagen'];
        if (!code) return ['Falta codigo de producto'];

        return [undefined, new UpdateProductDto(id, name, description, quantity, img, code)];

    }

}