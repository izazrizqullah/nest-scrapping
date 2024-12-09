import { Controller, Get, Query } from '@nestjs/common';
import { AmazonService } from './amazon.service';

@Controller('amazon')
export class AmazonController {
  constructor(private readonly amazonService: AmazonService) {}

  @Get('products')
  getProducts(
    @Query('product') product: string,
    @Query('numPages') numPages: number,
  ) {
    return this.amazonService.getProducts(product, numPages);
  }
}
