import { NestFactory } from '@nestjs/core';
import { from } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { AppModule } from './app.module';

from(NestFactory.create(AppModule)).pipe(
  tap((app) => {
    app.enableCors();
  }),
  mergeMap((app) => from(app.listen(process.env.PORT || 3001)))
).subscribe({
  error: (error) => {
    // tslint:disable-next-line: no-unsafe-any
    console.error(error);
    process.exit(1);
  },
  complete: () => {
    // TODO for some reason, listen does not throw an error if it fails.
    console.info(`Server is listening on http://localhost:${process.env.PORT || 3001}`);
  }
});
