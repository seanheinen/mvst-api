import { readFileSync, writeFileSync, existsSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { mergeMap, Observable, of, tap } from 'rxjs';
import { CompareUtil } from 'src/utils';

@Injectable()
export class TimerDao {

  private readonly dbFileLocation = 'api.db'

  public get(): Observable<number> {

    if (!existsSync(this.dbFileLocation)) {
      return of(0);
    }

    const totalMs = +(readFileSync(this.dbFileLocation).toString());
    return of(CompareUtil.isNumberAndNotNaN(totalMs)
      ? totalMs
      : 0);
  }

  public update(totalMs: number): Observable<number> {
    return this.get().pipe(
      tap((ms) => {
        writeFileSync(this.dbFileLocation, (ms + totalMs).toString());
      }),
      mergeMap(() => this.get())
    )
  }

}
