import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Point } from 'src/entities/points.entity';
import { Reservation } from 'src/entities/reservations.entity';
import { SeatReservation } from 'src/entities/seatreservations.entity';
import { Seat } from 'src/entities/seats.entity';
import { Show } from 'src/entities/shows.entity';
import { User } from 'src/entities/users.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [User, Point, Reservation, Show, Seat, SeatReservation],
      synchronize: true,
    };
  }
}
