import { Controller, Get, Post, Body, Req, UseGuards, HttpCode, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/local.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import JwtAuthGuard from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const jwt = this.usersService.login(user.id, user.isAdmin);
    res.cookie('jwt', jwt.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    return res.send({
      message: 'success',
    });
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async findUser(@Req() req: RequestWithUser) {
    const user = req.user;
    user.password = undefined;
    return user;
  }
}
