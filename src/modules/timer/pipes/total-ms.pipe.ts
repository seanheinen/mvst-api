

import { PipeTransform, Injectable, HttpStatus } from '@nestjs/common';
import { CompareUtil } from 'src/utils';
import { TotalMs } from '../models';

@Injectable()
export class TotalMsPipe implements PipeTransform {

  // tslint:disable-next-line: no-any
  public transform(incomingValue: any): TotalMs {

    const { totalMs } = incomingValue;

    if (CompareUtil.isNumberAndNotNaN(totalMs)) {

      return {
        totalMs
      };

    }
    throw 'error';
    // throw new ApiException([{
    //   type: ErrorType.Validation,
    //   message: `Invalid notification payload.`
    // }], HttpStatus.BAD_REQUEST);

  }

}
