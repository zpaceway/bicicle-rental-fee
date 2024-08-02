import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
export class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  userId: string;

  @Column('float')
  hours: number;

  @Column('float')
  rentalFee: number;
}
