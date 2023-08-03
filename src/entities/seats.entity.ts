import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Show } from './shows.entity';
import { SeatReservation } from './seatreservations.entity';

@Entity({ schema: 'ticketing', name: 'seats' })
export class Seat {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  seatNumber: number;

  @Column()
  grade: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SeatReservation, (seatReservation) => seatReservation.seat)
  seatReservations: SeatReservation[];

  @ManyToOne(() => Show, (show) => show.seats)
  show: Show;
}
