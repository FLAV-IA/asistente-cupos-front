import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient } from '@angular/common/http'
import { AsistenteHttpClientFake } from '../application/service/asistente-http-client.fake'

import { CsvHttpClientAdapter } from '../application/service/csv-http-client.adapter'
import { environment } from '../environments/environment'
import { CSV_HTTP_CLIENT } from '../application/service/csv-http-client.port'
import { ASISTENTE_HTTP_CLIENT } from '../application/service/asistente-http-client.port'
import { AsistenteHttpClientAdapter } from '../application/service/asistente-http-client.adapter'
import { CsvHttpClientFake } from '../application/service/csv-http-client.fake'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: CSV_HTTP_CLIENT,
      useClass: environment.useMockHttp
        ? CsvHttpClientFake
        : CsvHttpClientAdapter,
    },
    {
      provide: ASISTENTE_HTTP_CLIENT,
      useClass: environment.useMockHttp
        ? AsistenteHttpClientFake
        : AsistenteHttpClientAdapter,
    },
  ],
}
