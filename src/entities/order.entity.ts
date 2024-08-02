/* import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

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
*/
import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
export class Order {
  private kmdollar = [
    [1, 2],
    [3, 5],
    [6, 9],
    [12, 15],
  ];
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  userId: string;

  @Column('float')
  hours: number;

  @Column('float')
  rentalFee: number;

  getDelivery() {
    for (const [hou, dollar] of this.kmdollar) {
      if (this.hours <= hou) {
        return dollar;
      }
    }
    return null;
  }
  calculateDelivery() {
    const rentalFee = this.getDelivery();
    if (!rentalFee) {
      throw new Error('Unprocessable entry');
    }
    this.rentalFee = rentalFee;
  }
}
