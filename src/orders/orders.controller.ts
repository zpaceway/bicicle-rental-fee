import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ProcessOrderDto } from '../dto';

@Controller('api/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('process')
  processOrder(@Body() processOrderDto: ProcessOrderDto) {
    return this.ordersService.processOrder(processOrderDto);
  }
}
