import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersModule } from './orders.module';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities';
import { ProcessOrderDto } from '../dto';
import { AppModule } from '../app.module';

describe('OrdersController', () => {
  let controller: OrdersController;
  let repository: Repository<Order>;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
      imports: [AppModule, OrdersModule],
      controllers: [OrdersController],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process order and return the correct bicicle rent fee', async () => {
    const processOrderDto: ProcessOrderDto = {
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3351',
      userId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3382',
      hours: 7,
    };

    const result = await controller.processOrder(processOrderDto);

    expect(result).toEqual({
      id: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3351',
      userId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3382',
      hours: 7,
      rentalFee: 15,
    });
  });

  // Cleanup after each test
  afterEach(async () => {
    await repository.clear(); // Clear the repository to ensure cleanup
  });

  // Ensure proper teardown
  afterAll(async () => {
    await module.close(); // Close the testing module to release resources
  });
});
