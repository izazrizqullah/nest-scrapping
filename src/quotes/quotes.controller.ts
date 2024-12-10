import { Controller, Get, Query } from '@nestjs/common';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async getQuotes(@Query('totalPages') totalPages: number) {
    return this.quotesService.getQuotes(totalPages);
  }
}
