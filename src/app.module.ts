import { Module } from '@nestjs/common';
import { AmazonModule } from './amazon/amazon.module';
import { ConfigModule } from '@nestjs/config';
import { AliexpressModule } from './aliexpress/aliexpress.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AmazonModule, AliexpressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
