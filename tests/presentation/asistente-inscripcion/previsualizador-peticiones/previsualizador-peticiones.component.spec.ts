import { TestBed } from '@angular/core/testing'
import { PrevisualizadorPeticionesComponent } from '../../../../src/presentation/asistente-inscripcion/previsualizador-peticiones/previsualizador-peticiones.component'
import { LoggingService } from '../../../../src/application/service/logging.service'
import { CsvService } from '../../../../src/application/service/csv/csv.service'
import { EventEmitter, signal } from '@angular/core'

describe('PrevisualizadorPeticionesComponent', () => {
  let component: PrevisualizadorPeticionesComponent
  let logger: { error: jest.Mock; log: jest.Mock }
  let csvService: {
    previsualizarCsv: jest.Mock
    limpiarPrevisualizacion: jest.Mock
    previewData$: any
    loading: any
  }

  beforeEach(() => {
    logger = { error: jest.fn(), log: jest.fn() }
    csvService = {
      previsualizarCsv: jest.fn(),
      limpiarPrevisualizacion: jest.fn(),
      previewData$: signal([]),
      loading: signal(false),
    }
    TestBed.configureTestingModule({
      imports: [PrevisualizadorPeticionesComponent],
      providers: [
        { provide: LoggingService, useValue: logger },
        { provide: CsvService, useValue: csvService },
      ],
    }).compileComponents()

    component = TestBed.createComponent(
      PrevisualizadorPeticionesComponent,
    ).componentInstance
    component.previsualizacionEvent = new EventEmitter<boolean>()
    jest.spyOn(component.previsualizacionEvent, 'emit')
  })

  it('al asignar null al archivo se limpia la previsualización', () => {
    component.archivoPeticiones = null

    expect(csvService.limpiarPrevisualizacion).toHaveBeenCalled()
    expect(component.previsualizacionEvent.emit).toHaveBeenCalledWith(false)
  })

  it('debe enviar archivo al servicio al asignarlo', () => {
    const file = new File(['a'], 'peticiones.csv')

    component.archivoPeticiones = file

    expect(csvService.previsualizarCsv).toHaveBeenCalledWith(file)
  })

  it('formatCodigoList debe formatear correctamente', () => {
    const result = component.formatCodigoList(['A', 'B'])

    expect(result).toEqual([
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
    ])
  })
})
