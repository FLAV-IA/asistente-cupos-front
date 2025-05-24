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
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import * as Papa from 'papaparse';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-asistente',
  standalone: true,
  imports:[FormsModule,CommonModule,FileUploadModule,InputTextareaModule,TableModule,KnobModule,ButtonModule,TagModule,PanelModule,CardModule,InputIconModule,ListboxModule,IconFieldModule,OverlayPanelModule],
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
  ultimasConsultas: any[] = [];


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
          this.loading = false;
          this.cuposAsignados = value as PedidoDeCupo[];
          console.log("Cupos asignados:", this.cuposAsignados);
        } catch (e) {
          console.error('Error al procesar la respuesta:', e);
        }
      }
    });
}

  consultar() {
    this.loading=true
    this.alumService.consultar(this.selectedFile);
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
        quoteChar: '"',
        escapeChar: '"',
        delimiter: "|", // Cambié el delimitador a |
        complete: (result) => {
          // El resultado ya es un array de objetos con las columnas del CSV
          this.datosCSV = result.data.map((row: any) => {
            // Aseguramos que la columna "codigos_comisiones" se convierta en un array de códigos
            return {
              dni: row.dni,
              codigosComisiones: row.codigos_comisiones ? row.codigos_comisiones.split(",") : [] // Convertimos la cadena a un array
            };
          });
          console.log("Datos parseados:", this.datosCSV);
        },
      });
    };

    reader.readAsText(file, 'UTF-8');
  }


  handleClear() {
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
    this.selectedFile = null;
    this.fileLoaded = false;
    this.datosCSV = [];
  }


  formatCodigoList(codigos: string[]): { label: string, value: string }[] {
    return codigos? codigos.map(codigo => ({
      label: codigo,  // Esto es lo que se muestra en el listbox
      value: codigo   // El valor asociado a cada opción
    })):[];
  }

  agregarConsulta(cupo: any): void {
    // Eliminar si ya existe (para evitar duplicados)
    this.ultimasConsultas = this.ultimasConsultas.filter(c => c.dniEstudiante !== cupo.dniEstudiante);

    // Insertar al principio
    this.ultimasConsultas.unshift(cupo);

    // Limitar a los últimos 10
    if (this.ultimasConsultas.length > 10) {
      this.ultimasConsultas.pop();
    }
  }
  eliminarConsulta(index: number): void {
    this.ultimasConsultas.splice(index, 1);
  }
}
