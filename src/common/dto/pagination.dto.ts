export class PaginationDto {

    private constructor(
        public skip: number,
        public take: number
    ) {

    }


    static create(object: { [key: string]: any }): [string?, PaginationDto?] {
        const { skip, take } = object;


        return [undefined, new PaginationDto(+skip, +take)];
    }


}