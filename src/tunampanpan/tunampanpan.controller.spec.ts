import { Test, TestingModule } from '@nestjs/testing';
import { TunampanpanController } from './tunampanpan.controller';

describe('TunampanpanController', () => {
  let controller: TunampanpanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TunampanpanController],
    }).compile();

    controller = module.get<TunampanpanController>(TunampanpanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
