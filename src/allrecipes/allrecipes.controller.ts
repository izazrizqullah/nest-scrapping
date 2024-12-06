import { Controller, Get, Query } from '@nestjs/common';
import { AllrecipesService } from './allrecipes.service';

@Controller('allrecipes')
export class AllrecipesController {
  constructor(private readonly allrecipesService: AllrecipesService) {}

  @Get('foods')
  getRecipes(@Query('food') food: string) {
    return this.allrecipesService.getProducts(food);
  }
}
