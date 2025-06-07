import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  log(message?: unknown, ...optionalParams: unknown[]): void {
    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.log(message, ...optionalParams);
    }
  }

  error(message?: unknown, ...optionalParams: unknown[]): void {
    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.error(message, ...optionalParams);
    }
  }
}
