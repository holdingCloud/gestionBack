
export class CreateProductDto {


    private constructor(
        public name: string,
        public description: string,
        public quantity: number,
        public img: string,
        public code: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateProductDto?] {

        const { name, description, quantity, img, code } = object;


        if (!name) return ['Falta nombre de producto'];
        if (!description) return ['Falta descripcion'];
        if (!img) return ['Falta imagen'];
        if (!code) return ['Falta codigo de producto'];

        return [undefined, new CreateProductDto(name, description, quantity, img, code)];

    }

}