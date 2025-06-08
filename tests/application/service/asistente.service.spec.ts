import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AsistenteService } from '../../../src/application/service/asistente.service';
import { LoggingService } from '../../../src/application/service/logging.service';
import { ASISTENTE_HTTP_CLIENT } from '../../../src/application/service/asistente-http-client.port';

describe('AsistenteService', () => {
  let service: AsistenteService;
  let adapter: { postConsultar: jest.Mock };
  let logger: { error: jest.Mock; log: jest.Mock };

  beforeEach(() => {
    adapter = { postConsultar: jest.fn().mockReturnValue(of([])) };
    logger = { error: jest.fn(), log: jest.fn() };
    TestBed.configureTestingModule({
      providers: [
        AsistenteService,
        { provide: ASISTENTE_HTTP_CLIENT, useValue: adapter },
        { provide: LoggingService, useValue: logger },
      ],
    });

    service = TestBed.inject(AsistenteService);
  });

  it('no debe enviar consulta si el archivo es null', () => {
    service.consultarConArchivo(null as any);

    expect(adapter.postConsultar).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });

  it('debe enviar archivo y actualizar señales', () => {
    const file = new File(['a'], 'datos.csv');

    service.consultarConArchivo(file);

    expect(adapter.postConsultar).toHaveBeenCalledWith(file);
    expect(service.cuposSugeridos$()).toEqual([]);
    expect(service.loading()).toBe(false);
    expect(logger.log).toHaveBeenCalled();
  });
});
