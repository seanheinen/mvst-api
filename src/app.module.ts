import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimerModule } from './modules';

@Module({
  imports: [
    TimerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
