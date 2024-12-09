import { Controller, Get, Query } from '@nestjs/common';
import { TunampanpanService } from './tunampanpan.service';

@Controller('tunampanpan')
export class TunampanpanController {
  constructor(private readonly tunampanpanService: TunampanpanService) {}

  @Get('products')
  async getProducts(@Query('product') product: string) {
    return await this.tunampanpanService.getProducts(product);
  }
}
