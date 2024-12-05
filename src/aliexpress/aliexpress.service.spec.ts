import { Test, TestingModule } from '@nestjs/testing';
import { AliexpressService } from './aliexpress.service';

describe('AliexpressService', () => {
  let service: AliexpressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AliexpressService],
    }).compile();

    service = module.get<AliexpressService>(AliexpressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
