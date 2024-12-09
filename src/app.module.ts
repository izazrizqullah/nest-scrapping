import { Module } from '@nestjs/common';
import { AmazonModule } from './amazon/amazon.module';
import { ConfigModule } from '@nestjs/config';
import { AliexpressModule } from './aliexpress/aliexpress.module';
import { AllrecipesModule } from './allrecipes/allrecipes.module';
import { TunampanpanModule } from './tunampanpan/tunampanpan.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AmazonModule,
    AliexpressModule,
    AllrecipesModule,
    TunampanpanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
