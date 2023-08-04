import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenPayload } from 'src/auth/tokenPayload.interface';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository, private jwtService: JwtService) {}

  async createUser(createUserDto: CreateUserDto) {
    const existUser = await this.getUserInfo(createUserDto.loginId);
    if (existUser) {
      throw new ConflictException(`User already exists. userId: ${createUserDto.loginId}`);
    }
    await this.transformPassword(createUserDto);

    return await this.usersRepository.save(createUserDto);
  }

  login(userId: number, isAdmin: boolean) {
    const payload: TokenPayload = { userId, isAdmin };
    return { accessToken: this.jwtService.sign(payload) };
  }

  public async getAuthenticatedUser(loginId: string, password: string) {
    try {
      const user = await this.getUserInfo(loginId);

      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword) {
        throw new UnauthorizedException();
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUserInfo(loginId: string) {
    return await this.usersRepository.findOneBy({ loginId });
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async transformPassword(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }
}
