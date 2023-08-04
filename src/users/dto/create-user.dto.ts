import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly loginId: string;

  @IsString()
  password: string;

  @IsString()
  readonly userName: string;

  @IsBoolean()
  readonly isAdmin: boolean;
}
