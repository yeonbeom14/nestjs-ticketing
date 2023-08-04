import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      usernameField: 'loginId',
    });
  }
  async validate(loginId: string, password: string): Promise<User> {
    return this.usersService.getAuthenticatedUser(loginId, password);
  }
}
