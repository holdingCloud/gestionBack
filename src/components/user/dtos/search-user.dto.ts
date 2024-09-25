export class SearchUserDto {

    protected constructor(
        public fullName: string,
        public email: string,
    ) { }

    static search(object: { [key: string]: any }): [string?, SearchUserDto?] {

        const { fullName, email } = object;


        return [undefined, new SearchUserDto(fullName, email)]


    }



}