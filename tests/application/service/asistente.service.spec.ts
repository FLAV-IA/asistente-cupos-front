import { TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { AsistenteService } from '../../../src/application/service/asistente.service'
import { LoggingService } from '../../../src/application/service/logging.service'
import { environment } from '../../../src/environments/environment'

describe('AsistenteService', () => {
  let service: AsistenteService
  let http: HttpTestingController
  let logger: { error: jest.Mock; log: jest.Mock }

  beforeEach(() => {
    logger = { error: jest.fn(), log: jest.fn() }
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LoggingService, useValue: logger }],
    })

    service = TestBed.inject(AsistenteService)
    http = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    http.verify()
  })

  it('no debe enviar consulta si el archivo es null', () => {
    service.consultarConArchivo(null)

    expect(logger.error).toHaveBeenCalled()
    http.expectNone(
      `${environment.apiBaseUrl}asistente/sugerencia-inscripcion-con-csv`,
    )
  })

  it('debe enviar archivo y actualizar señales', () => {
    const file = new File(['a'], 'datos.csv')

    service.consultarConArchivo(file)

    const req = http.expectOne(
      `${environment.apiBaseUrl}asistente/sugerencia-inscripcion-con-csv`,
    )
    expect(req.request.method).toBe('POST')
    req.flush([])
    expect(service.cuposSugeridos$()).toEqual([])
    expect(service.loading()).toBe(false)
    expect(logger.log).toHaveBeenCalled()
  })
})
