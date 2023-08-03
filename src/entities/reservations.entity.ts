import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Point } from './points.entity';
import { User } from './users.entity';
import { Show } from './shows.entity';
import { SeatReservation } from './seatreservations.entity';

@Entity({ schema: 'ticketing', name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  isCanceled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Point, (point) => point.reservation)
  points: Point[];

  @OneToMany(() => SeatReservation, (seatReservation) => seatReservation.reservation)
  seatReservations: SeatReservation[];

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Show, (show) => show.reservations)
  show: Show;
}
