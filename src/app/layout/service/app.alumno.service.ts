import {Injectable, signal, WritableSignal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PedidoDeCupo} from "../../core/domain/PedidoDeCupo";



@Injectable({
  providedIn: 'root'
})

export class AlumnoService{
  API_URL="http://localhost:8080/"
  API_URL_CONSULTAR="/consultar?userInput="
  alumnos: Alumno[];
  respuesta: WritableSignal<string | null>;

  constructor(private http: HttpClient) {
    this.alumnos= [];
    this.respuesta = signal<string | null>(null);

  }
  getUser(){
    return this.http.get<Alumno[]>(this.API_URL)
  }

  consultar(selectedFile: File | null): void {
    if (!selectedFile) {
      console.error("No hay archivo seleccionado");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); // debe llamarse 'file' para que coincida con el backend

    this.http.post(`${this.API_URL}asistente/sugerencia-inscripcion-con-csv`, formData, {
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        this.respuesta.set(response);
        console.log("Respuesta recibida:", response);
      },
      error: (error) => {
        console.error("Error al consultar:", error);
      },
      complete: () => {
        console.log("Consulta completada");
      }
    });
  }
  consultarCsv(uploadedFiles: any) {
    this.http.get(`${this.API_URL}/consultar?file=${uploadedFiles}`, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.respuesta.set(response);
          console.log("Respuesta recibida:", response);
        },
        error: (error) => console.error("Error al consultar:", error),
        complete: () => console.log("Consulta completada")
      });
  }
}
