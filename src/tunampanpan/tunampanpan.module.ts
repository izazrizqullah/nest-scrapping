import { Module } from '@nestjs/common';
import { TunampanpanService } from './tunampanpan.service';
import { TunampanpanController } from './tunampanpan.controller';

@Module({
  providers: [TunampanpanService],
  controllers: [TunampanpanController]
})
export class TunampanpanModule {}
