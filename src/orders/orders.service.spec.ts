import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { ProcessOrderDto } from '../dto';
import { Order } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppModule } from '../app.module';
import { OrdersModule } from './orders.module';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<Order>;
  let module: TestingModule;
  const testUserId = '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3323';

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
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  afterEach(async () => {
    // Clean up the orders created during the test
    await repository.clear();
  });

  // Ensure proper teardown
  afterAll(async () => {
    await module.close(); // Close the testing module to release resources
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should throw an error for hours greater than 12h', async () => {
    const testOrderId = '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3312';
    const processOrderDto: ProcessOrderDto = {
      orderId: testOrderId,
      userId: testUserId,
      hours: 13,
    };

    await expect(service.processOrder(processOrderDto)).rejects.toThrow(
      'Unprocessable entry',
    );
  });

  it.each([
    {
      hours: 0.5,
      expectedRentalFee: 2,
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3381',
    },
    {
      hours: 3,
      expectedRentalFee: 5,
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3382',
    },
    {
      hours: 5,
      expectedRentalFee: 9,
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3383',
    },
    {
      hours: 6,
      expectedRentalFee: 9,
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3383',
    },
    {
      hours: 12,
      expectedRentalFee: 15,
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3384',
    },
  ])(
    'should calculate rental fee correctly for hours',
    async ({ hours, expectedRentalFee, orderId }) => {
      const processOrderDto: ProcessOrderDto = {
        orderId: orderId,
        userId: testUserId,
        hours,
      };

      const result = await service.processOrder(processOrderDto);

      expect(result.rentalFee).toBe(expectedRentalFee);
    },
  );
});
