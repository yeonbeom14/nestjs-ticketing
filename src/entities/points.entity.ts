import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Reservation } from './reservations.entity';

@Entity({ schema: 'ticketing', name: 'points' })
export class Point {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  point: number;

  @Column()
  reason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.points)
  user: User;

  @ManyToOne(() => Reservation, (reservation) => reservation.points)
  reservation: Reservation;
}
