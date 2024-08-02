import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
export class Order {

  private horaCosto = [
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

  
  getAlquiler() {
    for (const [horaAlquiler, precioAlquiler] of this.horaCosto) {
      if (this.hours <= horaAlquiler && horaAlquiler < 13) {
        return precioAlquiler;
      }
    }
    return null;
  }

  calcularAlquilar() {
    const rentalFee = this.getAlquiler();
    if (rentalFee === null) {
      throw new Error('Unprocessable entry');
    }
    this.rentalFee = rentalFee;
  }

}
