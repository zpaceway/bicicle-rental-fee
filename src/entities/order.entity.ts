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

  private rentaBicicleta = [
    [1, 2],
    [3, 5],
    [6, 9],
    [12, 15],
  ];

  getRenta() {
    for (const [hoursBici, rentaDolares] of this.rentaBicicleta) {
      if (this.hours <= hoursBici) {
        return rentaDolares;
      }
    }

    return null;
  }

  calcularRenta() {
    const renta = this.getRenta();
    if (renta === null) {
      throw new Error('Unprocessable entry');
    }

    this.rentalFee = renta;
  }
}
