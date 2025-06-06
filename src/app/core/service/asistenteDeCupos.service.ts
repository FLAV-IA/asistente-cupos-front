import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SugerenciaDeInscripcion } from '../domain/SugerenciaDeInscripcion';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private readonly BASE_URL = 'http://localhost:8080/';
  private readonly CONSULTAR_ENDPOINT = 'asistente/sugerencia-inscripcion-con-csv';
  private readonly ALUMNOS_ENDPOINT = '';

  private readonly cuposSugeridos: WritableSignal<SugerenciaDeInscripcion[]> = signal<SugerenciaDeInscripcion[]>([]);

  constructor(private http: HttpClient) {}

  get alumnos$() {
    return this.http.get<Alumno[]>(`${this.BASE_URL}${this.ALUMNOS_ENDPOINT}`);
  }

  get cuposSugeridos$() {
    return this.cuposSugeridos.asReadonly();
  }

  consultarConArchivo(file: File | null): void {
    if (!file) {
      console.error('No hay archivo seleccionado');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.http.post<SugerenciaDeInscripcion[]>(`${this.BASE_URL}${this.CONSULTAR_ENDPOINT}`, formData).subscribe({
      next: (response) => {
        this.cuposSugeridos.set(response);
        console.log('Respuesta recibida:', response);
      },
      error: (error) => console.error('Error al consultar:', error),
      complete: () => console.log('Consulta completada')
    });
  }
}
