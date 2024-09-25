export class SearchProductDto {


    private constructor(
        public name: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, SearchProductDto?] {

        const { name } = object;

        //if (!name) return ['Nombre debe ser texto'];

        return [undefined, new SearchProductDto(name)];

    }

}