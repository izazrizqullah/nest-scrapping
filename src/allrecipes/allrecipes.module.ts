import { Module } from '@nestjs/common';
import { AllrecipesService } from './allrecipes.service';
import { AllrecipesController } from './allrecipes.controller';

@Module({
  providers: [AllrecipesService],
  controllers: [AllrecipesController]
})
export class AllrecipesModule {}
