import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import * as Papa from 'papaparse';

@Component({
  selector: 'previsualizador-peticiones-component',
  templateUrl: './previsualizador-peticiones.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ListboxModule],
})
export class PrevisualizadorPeticionesComponent {
  peticionesParseadas: any[] = [];

  @Output() previsualizacionEvent = new EventEmitter<boolean>();

  @Input()
  set archivoPeticiones(value: File | null) {
    if (value) {
      this.parsearArchivo(value);
    } else {
      this.peticionesParseadas = [];
      this.previsualizacionEvent.emit(false);
    }
  }

  formatCodigoList(codigos: string[]): { label: string; value: string }[] {
    return codigos
      ? codigos.map((codigo) => ({ label: codigo, value: codigo }))
      : [];
  }

  private parsearArchivo(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const csv = reader.result as string;
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        quoteChar: '"',
        escapeChar: '"',
        delimiter: '|',
        complete: (result) => {
          this.peticionesParseadas = result.data.map((row) =>
            this.parsearPeticion(row),
          );
          this.previsualizacionEvent.emit(this.peticionesParseadas.length > 0);
        },
      });
    };
    reader.readAsText(file, 'UTF-8');
  }

  private parsearPeticion(row: any): {
    dni: string;
    codigosComisiones: string[];
  } {
    return {
      dni: row.dni,
      codigosComisiones: row.codigos_comisiones
        ? row.codigos_comisiones.split(',')
        : [],
    };
  }
}
