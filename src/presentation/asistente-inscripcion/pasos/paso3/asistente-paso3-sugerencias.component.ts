import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimacionPlaceholderComponent } from "../../../animations/animation-container.component";
import { HistoriaAcademicaListComponent } from "../../historia-academica/historia-academica-list.component";
import { TablaSugerenciaInscripcionComponent } from "../../sugerencias/tabla-sugerencia-inscripcion.component";
import {HistoriaAcademica} from "../../../../domain/HistoriaAcademica";
import {SugerenciaDeInscripcion} from "../../../../domain/SugerenciaDeInscripcion";
import { ButtonModule } from 'primeng/button';
import {Comision} from "../../../../domain/Comision";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'asistente-paso3-sugerencias',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    TablaSugerenciaInscripcionComponent,
    HistoriaAcademicaListComponent,
    AnimacionPlaceholderComponent,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './asistente-paso3-sugerencias.component.html',
})
export class AsistentePaso3SugerenciasComponent {
  @Input() estado!: string;
  @Input() sugerencias: SugerenciaDeInscripcion[] = [];
  @Input() listaDehistoriaAcademica: HistoriaAcademica[] = [];
  @Input() comisiones :Comision[] = [];
  @Output() cambioSugerencias = new EventEmitter<SugerenciaDeInscripcion[]>();
  @Output() asignar = new EventEmitter<SugerenciaDeInscripcion>();
  @Output() desasignar = new EventEmitter<SugerenciaDeInscripcion>();
  @Output() confirmarAsignacion = new EventEmitter<SugerenciaDeInscripcion[]>();
  @Output() reintentarConsultaDeSugerencias = new EventEmitter<void>();

constructor(private messageService: MessageService) {
}
  verHistoria(sugerencia: SugerenciaDeInscripcion): void {
    const existe = this.listaDehistoriaAcademica.some((h) => h.dni === sugerencia.historiaAcademica?.dni);
    if (!existe && sugerencia.historiaAcademica) {
      this.listaDehistoriaAcademica.push(sugerencia.historiaAcademica);
    }
  }

  eliminarHistoria(item: HistoriaAcademica): void {
    this.listaDehistoriaAcademica = this.listaDehistoriaAcademica.filter(
      (h) => h !== item
    );
  }

  seleccionarAnimacionSinSugerencias(): string {
    switch (this.estado) {
      case 'cargando':
        return '/assets/animaciones/consultando.json';
      case 'error':
        return '/assets/animaciones/errorFormato.json';
      default:
        return '/assets/animaciones/contenidoNoDisponible.json';
    }
  }

  seleccionarMsjSinSugerencias() {
    switch (this.estado) {
      case 'cargando':
        return 'Estamos buscando la mejor opción';
      case 'error':
        return 'ups, esto es vergonzoso';
      default:
        return 'Aún no tenemos sugerencias para vos';
    }
  }

  reintentar() {
    console.log('Reintentando consulta de sugerencias... paso3');
    this.reintentarConsultaDeSugerencias.emit();
  }
  reintentarAccion = () => this.reintentar();

  consultarCupo(event: { codigoComision: string; callback: (hayCupo: boolean) => void }): void {
    const comision = this.comisiones.find(c => c.codigo === event.codigoComision);
    const hayCupo = comision ? comision.cuposDisponibles > 0 : false;
    if(!hayCupo) {
      this.mostrarSinCupos(comision!);
    }
    event.callback(hayCupo);
  }
  mostrarSinCupos(comision: Comision) {
    this.messageService.add({
      key: 'advertenciaDeFaltaDeCupo',
      severity: 'warn',
      summary: 'Sin cupos disponibles',
      detail: `La comisión ${comision.codigo} no tiene cupos disponibles.`,
      life: 4000
    });
  }


}
