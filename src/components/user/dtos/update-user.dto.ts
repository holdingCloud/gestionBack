export class UpdateUserDto {

    private constructor(
        public readonly id: number,
        public email: string,
        public userName: string,
        public fullName: string,
        public password: string,
        public avatar: string,
        public isActive: boolean
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.email) returnObj.email = this.email;
        if (this.userName) returnObj.userName = this.userName;
        if (this.fullName) returnObj.fullName = this.fullName;
        if (this.password) returnObj.password = this.password;
        if (this.avatar) returnObj.avatar = this.avatar;
        returnObj.isActive = this.isActive;

        return returnObj;
    }


    static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
        const { id, email, userName, fullName, password, avatar, isActive } = object;

        if (!id || isNaN(Number(id))) {
            return ['debe ser un número valido'];
        }
        if (!email) return ['Falta el email'];
        if (!userName) return ['Faltan el userName'];
        if (!fullName) return ['Falta el fullName'];
        if (password != "") {
            if (password.length < 6) return ['Contraseña demasiado corta'];
        }
        if (!avatar) return ['Falta el avatar'];

        return [undefined, new UpdateUserDto(id, email, userName, fullName, password, avatar, isActive)];

    }


}