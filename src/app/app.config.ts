import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { CSV_HTTP_CLIENT_FAKE_PROVIDER } from '../application/service/csv-http-client.fake';
import { ASISTENTE_HTTP_CLIENT_FAKE_PROVIDER } from '../application/service/asistente-http-client.fake';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    CSV_HTTP_CLIENT_FAKE_PROVIDER,
    ASISTENTE_HTTP_CLIENT_FAKE_PROVIDER,
  ],
};
