import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion';

@Injectable({
  providedIn: 'root'
})
export class AsistenteService {
  private readonly BASE_URL = 'http://localhost:8080/';
  private readonly CONSULTAR_ENDPOINT = 'asistente/sugerencia-inscripcion-con-csv';

  private readonly _cuposSugeridos: WritableSignal<SugerenciaDeInscripcion[]> = signal<SugerenciaDeInscripcion[]>([]);
  private readonly _loading = signal(false);

  constructor(private http: HttpClient) {}

  // Accesores de solo lectura para el componente
  readonly cuposSugeridos$ = this._cuposSugeridos.asReadonly();
  readonly loading = this._loading.asReadonly();

  consultarConArchivo(file: File | null): void {
    if (!file) {
      console.error('No hay archivo seleccionado');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this._loading.set(true);

    this.http.post<SugerenciaDeInscripcion[]>(`${this.BASE_URL}${this.CONSULTAR_ENDPOINT}`, formData).subscribe({
      next: (response) => {
        this._cuposSugeridos.set(response ?? []);
        console.log('Respuesta recibida:', response);
      },
      error: (error) => {
        console.error('Error al consultar:', error);
        this._cuposSugeridos.set([]);
      },
      complete: () => {
        this._loading.set(false);
        console.log('Consulta completada');
      }
    });
  }
}
