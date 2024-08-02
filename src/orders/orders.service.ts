import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessOrderDto } from '../dto';
import { Order } from '../entities';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async processOrder(processOrderDto: ProcessOrderDto) {
    const order = this.orderRepository.create({
      id: processOrderDto.orderId,
      userId: processOrderDto.userId,
      hours: processOrderDto.hours,
    });

    order.calcular();
    await this.orderRepository.insert(order);

    return {
      id: processOrderDto.orderId,
      userId: processOrderDto.userId,
      hours: processOrderDto.hours,
      rentalFee: order.rentalFee,
    };
  }
}
