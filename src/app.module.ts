import { Module } from '@nestjs/common';
import { AmazonModule } from './amazon/amazon.module';
import { ConfigModule } from '@nestjs/config';
import { AliexpressModule } from './aliexpress/aliexpress.module';
import { AllrecipesModule } from './allrecipes/allrecipes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AmazonModule,
    AliexpressModule,
    AllrecipesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
