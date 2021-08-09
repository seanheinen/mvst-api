import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { TimerDao } from '../daos';
import { TotalMs } from '../models';

@Injectable()
export class TimerService {

  public constructor(private readonly dao: TimerDao) { }

  public get(): Observable<TotalMs> {
    return this.dao.get().pipe(
      map((ms) => ({ totalMs: ms }))
    );
  }

  public update(totalMs: TotalMs): Observable<TotalMs> {
    return this.dao.update(totalMs.totalMs).pipe(
      map((ms) => ({ totalMs: ms }))
    );
  }

}
