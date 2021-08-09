import { Body, Controller, Get, Headers, Put } from '@nestjs/common';
import { TimerService } from '../services';
import { TotalMs } from '../models';
import { Observable } from 'rxjs';
import { TotalMsPipe } from '../pipes';

@Controller('timer')
export class TimerController {

  public constructor(private readonly service: TimerService) { }

  @Get()
  public get(@Headers('authorization') bearer: string): Observable<TotalMs> {
    return this.service.get();
  }

  @Put()
  public update(
    @Body(TotalMsPipe) totalMs: TotalMs
  ): Observable<TotalMs> {
    return this.service.update(totalMs);
  }
}
