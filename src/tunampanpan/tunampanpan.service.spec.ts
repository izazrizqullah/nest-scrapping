import { Test, TestingModule } from '@nestjs/testing';
import { TunampanpanService } from './tunampanpan.service';

describe('TunampanpanService', () => {
  let service: TunampanpanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TunampanpanService],
    }).compile();

    service = module.get<TunampanpanService>(TunampanpanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
