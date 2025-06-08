import { TestBed } from '@angular/core/testing'
import { CsvService } from '../../../src/application/service/csv.service'
import { CsvHttpClientPort, CSV_HTTP_CLIENT } from '../../../src/application/service/csv-http-client.port'
import { LoggingService } from '../../../src/application/service/logging.service'
import { of } from 'rxjs'

describe('CsvService', () => {
  let service: CsvService
  let adapter: { postPreviewCsv: jest.Mock }
  let logger: { error: jest.Mock; log: jest.Mock }

  beforeEach(() => {
    adapter = { postPreviewCsv: jest.fn().mockReturnValue(of([])) }
    logger = { error: jest.fn(), log: jest.fn() }
    TestBed.configureTestingModule({
      providers: [
        CsvService,
        { provide: CSV_HTTP_CLIENT, useValue: adapter },
        { provide: LoggingService, useValue: logger },
      ],
    })

    service = TestBed.inject(CsvService)
  })

  it('no debe enviar si archivo es null', () => {
    service.previsualizarCsv(null as any)

    expect(adapter.postPreviewCsv).not.toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalled()
  })

  it('debe enviar archivo al adaptador', () => {
    const csv = 'dni|codigos_comisiones\n1|A'
    const file = new File([csv], 'datos.csv')

    const mockFileReader = {
      result: csv,
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
      readAsText: jest.fn(function () {
        if (this.onload) this.onload()
      }),
    }
    ;(global as any).FileReader = jest.fn(() => mockFileReader)

    service.previsualizarCsv(file)

    expect(mockFileReader.readAsText).toHaveBeenCalled()
    expect(adapter.postPreviewCsv).toHaveBeenCalledWith(file)
  })
})
