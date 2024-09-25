import { regularExps } from '../../../config';


export class RegisterUserDto {

  private constructor(
    public email: string,
    public userName: string,
    public fullName: string,
    public avatar: string,
    public password: string,
    public isActive: boolean
  ) { }

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { email, userName, fullName, avatar, password, isActive } = object;

    if (!email) return ['Falta el email'];
    if (!userName) return ['Falta nombre usuario'];
    if (!fullName) return ['Falta nombres y apellidos']
    if (!regularExps.email.test(email)) return ['Email no valido'];
    if (!avatar) return ['falta el avatar'];
    if (!password) return ['Falta la contraseña'];
    if (password.length < 6) return ['Contraseña demasiado corta'];

    return [undefined, new RegisterUserDto(email, userName, fullName, avatar, password, isActive)];

  }


}