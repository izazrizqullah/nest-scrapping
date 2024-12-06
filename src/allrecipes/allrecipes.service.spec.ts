import { Test, TestingModule } from '@nestjs/testing';
import { AllrecipesService } from './allrecipes.service';

describe('AllrecipesService', () => {
  let service: AllrecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllrecipesService],
    }).compile();

    service = module.get<AllrecipesService>(AllrecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
