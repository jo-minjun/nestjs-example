import { Module } from '@nestjs/common';
import { DelayController } from './controller/delay.controller';
import { DelayService } from './service/delay.service';

@Module({
  imports: [],
  controllers: [DelayController],
  providers: [DelayService],
})
export class AppModule {}
