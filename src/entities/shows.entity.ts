import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Reservation } from './reservations.entity';
import { Seat } from './seats.entity';

@Entity({ schema: 'ticketing', name: 'shows' })
export class Show {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  showTime: Date;

  @Column()
  maxSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Seat, (seat) => seat.show)
  seats: Seat[];

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservations: Reservation[];
}
