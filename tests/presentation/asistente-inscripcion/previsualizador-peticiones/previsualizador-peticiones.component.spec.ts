import { TestBed } from '@angular/core/testing'
import { PrevisualizadorPeticionesComponent } from '../../../../src/presentation/asistente-inscripcion/previsualizador-peticiones/previsualizador-peticiones.component'
import { LoggingService } from '../../../../src/application/service/logging.service'
import { EventEmitter } from '@angular/core'

describe('PrevisualizadorPeticionesComponent', () => {
  let component: PrevisualizadorPeticionesComponent
  let logger: { error: jest.Mock; log: jest.Mock }

  beforeEach(() => {
    logger = { error: jest.fn(), log: jest.fn() }
    TestBed.configureTestingModule({
      imports: [PrevisualizadorPeticionesComponent],
      providers: [{ provide: LoggingService, useValue: logger }],
    }).compileComponents()

    component = TestBed.createComponent(
      PrevisualizadorPeticionesComponent,
    ).componentInstance
    component.previsualizacionEvent = new EventEmitter<boolean>()
    jest.spyOn(component.previsualizacionEvent, 'emit')
  })

  it('al asignar null al archivo se limpia la previsualización', () => {
    component.archivoPeticiones = null

    expect(component.peticionesParseadas).toEqual([])
    expect(component.previsualizacionEvent.emit).toHaveBeenCalledWith(false)
  })

  it('debe parsear archivo CSV correctamente', () => {
    const csvContent = 'dni|codigos_comisiones\n123|A,B'
    const file = new File([csvContent], 'peticiones.csv', { type: 'text/csv' })

    const mockFileReader = {
      result: csvContent,
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
      readAsText: jest.fn(function () {
        if (this.onload) this.onload()
      }),
    }
    ;(global as any).FileReader = jest.fn(() => mockFileReader)

    component.archivoPeticiones = file

    expect(mockFileReader.readAsText).toHaveBeenCalled()
    expect(component.peticionesParseadas.length).toBe(1)
    expect(component.peticionesParseadas[0]).toEqual({
      dni: '123',
      codigosComisiones: ['A', 'B'],
    })
    expect(component.previsualizacionEvent.emit).toHaveBeenCalledWith(true)
  })

  it('formatCodigoList debe formatear correctamente', () => {
    const result = component.formatCodigoList(['A', 'B'])

    expect(result).toEqual([
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
    ])
  })
})
