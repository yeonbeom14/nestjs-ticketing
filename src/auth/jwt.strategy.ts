import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly usersService: UsersService) {
    const extactFromCookie = (request) => {
      let token = null;
      if (request && request.cookies) token = request.cookies['jwt'];
      return token;
    };
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extactFromCookie]),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
  async validate(payload: TokenPayload, done: VerifiedCallback) {
    const user = await this.usersService.getById(payload.userId);
    if (!user) {
      return done(new UnauthorizedException({ message: 'user does not exist' }), false);
    }
    return done(null, user);
  }
}
