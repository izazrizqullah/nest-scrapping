import { Test, TestingModule } from '@nestjs/testing';
import { AllrecipesController } from './allrecipes.controller';

describe('AllrecipesController', () => {
  let controller: AllrecipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllrecipesController],
    }).compile();

    controller = module.get<AllrecipesController>(AllrecipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
