import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessOrderDto } from '../dto';
import { Order } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) { }

  async processOrder(processOrderDto: ProcessOrderDto) {
    const order = this.orderRepository.create({
      id: processOrderDto.orderId,
      userId: processOrderDto.userId,
      hours: processOrderDto.hours,
    });

    order.calcularAlquilar();
    await this.orderRepository.insert(order);

    return {
      id: processOrderDto.orderId,
      userId: processOrderDto.userId,
      hours: processOrderDto.hours,
      rentalFee: order.rentalFee,
    };
  }
}