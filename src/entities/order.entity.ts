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

  private comisionRentaPorTiempo = [
    [1, 2],
    [3, 5],
    [6, 9],
    [12, 15]
  ]

  getComisionPorTiempo(){
    for( const[tiempo, costoComision] of this .comisionRentaPorTiempo ){
      if( this.hours <= tiempo ){
        return costoComision;
      }
    }

    return null;
  }

  calcularComisionRenta(){
    const comision = this.getComisionPorTiempo();
    if( comision === null ){
      throw new Error('Unprocessable entry')
    }

    this.rentalFee = comision
  }

}

