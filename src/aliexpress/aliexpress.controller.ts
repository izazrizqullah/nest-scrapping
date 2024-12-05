import { Controller, Get, Query } from '@nestjs/common';
import { AliexpressService } from './aliexpress.service';

@Controller('aliexpress')
export class AliexpressController {
  constructor(private readonly aliexpressService: AliexpressService) {}

  @Get('products')
  getProducts(@Query('product') product: string) {
    return this.aliexpressService.getProducts(product);
  }
}
