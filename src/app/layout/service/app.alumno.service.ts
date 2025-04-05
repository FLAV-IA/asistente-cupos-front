import {Injectable, signal, WritableSignal} from "@angular/core";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})

export class AlumnoService{
  API_URL="http://localhost:8080/alumnos"
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

  consultar(userInput: string): void {

    const body = { userInput };

    this.http.put(`${this.API_URL}/consultar`, body, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.respuesta.set(response);
          console.log("Respuesta recibida:", response);
        },
        error: (error) => console.error("Error al consultar:", error),
        complete: () => console.log("Consulta completada")
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
