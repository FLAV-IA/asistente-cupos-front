import {Component, effect, inject, OnInit, ViewChild} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {AlumnoService} from "../../../layout/service/app.alumno.service";
import {FormBuilder, FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FileUpload, FileUploadModule} from 'primeng/fileupload';
import { InputTextareaModule  } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import {PedidoDeCupo} from "../../domain/PedidoDeCupo";
import { KnobModule } from 'primeng/knob';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import {Comision} from "../../domain/Comision";
import { CardModule } from 'primeng/card';
import { InputIconModule } from 'primeng/inputicon';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-asistente',
  standalone: true,
  imports:[FormsModule,CommonModule,FileUploadModule,InputTextareaModule,TableModule,KnobModule,ButtonModule,TagModule,PanelModule,CardModule,InputIconModule ],
  templateUrl: './asistente.component.html',
  styleUrl: './asistente.component.css'
})
export class AsistenteComponent implements OnInit{
  consulta: string = '';
  private alumService = inject(AlumnoService);
  respuesta = this.alumService.respuesta; // Vinculamos el signal
  uploadedFiles: any;
  infoAlumnos: any;
  cuposAsignados: PedidoDeCupo[]=[];
  comisiones: Comision[] = [];
  selectedFile: File | null = null;
  fileLoaded = false;  // Estado de si el archivo fue cargado
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  datosCSV: any[] = [];


  ngOnInit(){
  }



  formGroup = this.fb.group({
    text: ['']
  });
  loading: boolean = false;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const value = this.respuesta();
      if (value) {
        try {
          this.loading=false

          this.cuposAsignados = JSON.parse(value);

        } catch (e) {
          console.error("Error al parsear la respuesta:", e);
        }
      }
    });

}

  consultar() {
    this.loading=true
    let pedidoDeCupos = this.alumService.consultar(this.selectedFile);
  }



  handleFileSelect(event: any) {
    this.selectedFile = event.files?.[0] ?? null;
    this.fileLoaded = !!this.selectedFile;
  }
  handleUpload(event: any) {
    const file = event.files[0];
    this.selectedFile = file;
    const reader = new FileReader();

    reader.onload = () => {
      const csv = reader.result as string;

      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        quoteChar: '"',        // asegura que respeta las comillas dobles
        escapeChar: '"',       // correcto para CSV estándar
        delimiter: ",",        // coma como delimitador
        complete: (result) => {
          this.datosCSV = result.data as any[];
          console.log("Datos parseados:", this.datosCSV);
        },
      });
    };

    reader.readAsText(file, 'UTF-8'); // asegúrate de leer con la codificación correcta
  }

  parsearCSV(contenido: string): any[] {
    const lineas = contenido.split('\n').filter(linea => linea.trim() !== '');
    const headers = lineas[0].split(',').map(h => h.trim());

    return lineas.slice(1).map(linea => {
      const valores = linea.split(',').map(v => v.trim());
      const obj: any = {};
      headers.forEach((header, i) => {
        obj[header] = valores[i];
      });
      return obj;
    });
  }


  handleClear() {
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
    this.selectedFile = null;
    this.fileLoaded = false;
    this.datosCSV = []; // limpia la tabla
  }



}
