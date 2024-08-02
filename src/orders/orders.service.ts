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
  ) {}

  async processOrder(processOrderDto: ProcessOrderDto) {
    let rentalfee = 0;

    if (processOrderDto.hours <= 1) {
      rentalfee = 2;
    } else if (processOrderDto.hours <= 3) {
      rentalfee = 5;
    } else if (processOrderDto.hours <= 6) {
      rentalfee = 9;
    } else if (processOrderDto.hours <= 12) {
      rentalfee = 15;
    } else {
      throw new Error('Unprocessable entry');
    }

    // registrar

    const orderDataForInsert = {
      id: processOrderDto.orderId,
      userId: processOrderDto.userId,
      hours: processOrderDto.hours,
      rentalFee: rentalfee,
    };

    let order = this.orderRepository.create(orderDataForInsert);
    await this.orderRepository.save(order);

    if (!order) {
      throw new Error('Unprocessable entry');
    }

    console.log('Order create with id: ' + order.id);

    return order;
  }
}
