import { LoginUserDto, RegisterUserDto } from '../components/auth/dtos';
import { CustomError } from '../errors/custom.error';
import { JwtAdapter, bcryptAdapter, envs } from '../config';
import { prisma } from '../database/mysql';



export class AuthService {

  // DI
  constructor(

  ) { }


  public async registerUser(registerUserDto: RegisterUserDto) {


    const existUser = await prisma.users.findFirst({
      where: { email: registerUserDto.email }
    });
    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const { password } = registerUserDto;

      // Encriptar la contraseña
      registerUserDto.password = bcryptAdapter.hash(password);
      registerUserDto.isActive = true;

      const user = await prisma.users.create({
        data: registerUserDto,
      });


      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer('Error while creating JWT');

      return {
        user: registerUserDto,
        token: token,
      };

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

  }



  public async loginUser(loginUserDto: LoginUserDto) {

    try {


      const user = await prisma.users.findFirst({
        where: { email: loginUserDto.email }
      });
      //UserModel.findOne({ email: loginUserDto.email });
      if (!user) {
        throw CustomError.badRequest(`Email no existe ${loginUserDto.email}`)
      };

      const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);

      if (!isMatching) {
        throw CustomError.badRequest('Password no valida')
      };


      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) {
        throw CustomError.internalServer('Error al crear token JWT')
      };


      return {
        user,
        token,
      }

    } catch (error) {
      throw CustomError.internalServer('Internal server error');
    }

  }

  public async checkStatus(token: string) {

    try {

      const payload = await JwtAdapter.validateToken<{ id: number }>(token);
      if (!payload) throw CustomError.internalServer('Error Invalid Token');

      const getToken = await JwtAdapter.generateToken({ id: payload.id });

      return {
        token: getToken
      }

    } catch (error) {
      throw CustomError.internalServer('Internal server error');
    }

  }

  public async keepSession(id: number) {

    try {

      const existUser = await prisma.users.findFirst({
        where: { id: id }
      });
      if (!existUser) throw CustomError.badRequest('Usuario no existe');

      const token = await JwtAdapter.generateToken({ id: id });

      if (!token) {
        throw CustomError.internalServer('Error al crear token JWT')
      };

      return {
        token
      }

    } catch (error) {
      throw CustomError.internalServer('Internal server error');
    }


  }


}