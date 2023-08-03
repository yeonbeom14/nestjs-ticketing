import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Reservation } from './reservations.entity';
import { Seat } from './seats.entity';

@Entity({ schema: 'ticketing', name: 'seatreservations' })
export class SeatReservation {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Seat, (seat) => seat.seatReservations)
  seat: Seat;

  @ManyToOne(() => Reservation, (reservation) => reservation.seatReservations)
  reservation: Reservation;
}
