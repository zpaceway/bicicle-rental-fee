import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessOrderDto } from '../dto';
import { Order } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  DATOS = [
    { hour: 1, cash: 2 },
    { hour: 3, cash: 5 },
    { hour: 6, cash: 9 },
    { hour: 12, cash: 15 },
  ];
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  calcularValor = (time) => {
    const valor = this.DATOS.find((item) => {
      return time <= item.hour;
    });
    if (valor) {
      return valor;
    } else {
      throw new Error('Unprocessable entry');
    }
  };

  async processOrder(processOrderDto: ProcessOrderDto) {
    const { orderId, userId, hours } = processOrderDto;
    const rental = this.calcularValor(hours);
    const order = this.orderRepository.create({
      id: orderId,
      userId: userId,
      hours: hours,
    });

    await this.orderRepository.insert({
      ...order,
      rentalFee: rental.cash,
    });

    return {
      ...order,
      rentalFee: rental.cash,
    };
  }
}
