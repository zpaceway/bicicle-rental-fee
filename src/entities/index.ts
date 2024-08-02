import { Order } from './order.entity';

export { Order };


export class ProcessedOrderDto {
    id: string;
    value: number;
    cashback: number;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }
  