import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AsistentePanelComponent } from '../../../../src/presentation/asistente-inscripcion/asistente-panel/asistente-panel.component'
import { AsistenteService } from '../../../../src/application/service/asistente.service'
import { LoggingService } from '../../../../src/application/service/logging.service'
import { signal } from '@angular/core'
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core'

describe('AsistentePanelComponent', () => {
  let component: AsistentePanelComponent
  let service: {
    consultarConArchivo: jest.Mock
    cuposSugeridos$: any
    loading: any
  }
  let logger: { error: jest.Mock; log: jest.Mock }

  beforeEach(() => {
    service = {
      consultarConArchivo: jest.fn(),
      cuposSugeridos$: signal([]),
      loading: signal(false),
    }
    logger = { error: jest.fn(), log: jest.fn() }

    TestBed.configureTestingModule({
      imports: [AsistentePanelComponent, HttpClientTestingModule],
      providers: [
        { provide: AsistenteService, useValue: service },
        { provide: LoggingService, useValue: logger },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideTemplate(AsistentePanelComponent, '')
      .compileComponents()

    component = TestBed.createComponent(
      AsistentePanelComponent,
    ).componentInstance
    component.archivoCargadoEvent = new EventEmitter<any>()
    jest.spyOn(component.archivoCargadoEvent, 'emit')
    component.sugerenciasDeInscripcionEvent = new EventEmitter<any[]>()
    jest.spyOn(component.sugerenciasDeInscripcionEvent, 'emit')
    component.fileUpload = { clear: jest.fn() } as any
  })

  it('debe seleccionar archivo CSV correctamente', () => {
    const file = new File(['a'], 'datos.csv', { type: 'text/csv' })

    component.seleccionarArchivo({ files: [file] })

    expect(component.selectedFile).toBe(file)
    expect(component.archivoCargado).toBe(true)
    expect(component.mensajeError).toBeNull()
  })

  it('debe mostrar error si la extensión del archivo es incorrecta', () => {
    const file = new File(['a'], 'datos.txt', { type: 'text/plain' })

    component.seleccionarArchivo({ files: [file] })

    expect(component.mensajeError).toBe('El archivo debe tener extensión .csv.')
    expect(component.selectedFile).toBeNull()
    expect(component.archivoCargado).toBe(false)
    expect(logger.error).toHaveBeenCalled()
    expect(component.archivoCargadoEvent.emit).toHaveBeenCalledWith(null)
  })

  it('debe limpiar archivo correctamente', () => {
    const clearSpy = jest.spyOn(component.fileUpload!, 'clear')
    component.selectedFile = new File(['a'], 'datos.csv')
    component.archivoCargado = true
    component.mensajeError = 'error'
    component.datosCSV = [1]

    component.limpiarArchivo()

    expect(clearSpy).toHaveBeenCalled()
    expect(component.selectedFile).toBeNull()
    expect(component.archivoCargado).toBe(false)
    expect(component.mensajeError).toBeNull()
    expect(component.datosCSV).toEqual([])
    expect(component.archivoCargadoEvent.emit).toHaveBeenCalledWith(null)
  })

  it('debe mostrar error al consultar sin archivo', () => {
    component.selectedFile = null

    component.consultar()

    expect(component.mensajeError).toBe(
      'Debe cargar un archivo CSV antes de consultar.',
    )
    expect(service.consultarConArchivo).not.toHaveBeenCalled()
  })

  it('debe llamar al servicio al consultar con archivo', () => {
    const file = new File(['a'], 'datos.csv')
    component.selectedFile = file

    component.consultar()

    expect(service.consultarConArchivo).toHaveBeenCalledWith(file)
  })
})
