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
   
      let rentalFee = 0;
  
      if (processOrderDto.hours <= 1) {
        rentalFee = 2;
      } else if (processOrderDto.hours <= 3) {
        rentalFee = 5;
      }
      else if (processOrderDto.hours <= 6) {
        rentalFee = 9;
      }
      else if (processOrderDto.hours <= 12) {
        rentalFee = 15;
      }
       else {
         throw new Error('Unprocessable entry');
      }
  
      // registrar
  
      const orderDataForInsert = {
         id: processOrderDto.orderId,
         userId: processOrderDto.userId,
         hours: processOrderDto.hours,
         rentalFee: rentalFee        
      };      
  
      let order = this.orderRepository.create(orderDataForInsert);
      await this.orderRepository.save(order);
  
      if (!order) {
         throw new Error('Unprocessable entry');
      }
  
      console.log("Order create with id: " + order.id);
  
      return order;
  
   
  }
}
