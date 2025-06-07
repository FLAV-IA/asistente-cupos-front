import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {FormBuilder, FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FileUpload, FileUploadModule} from 'primeng/fileupload';
import { InputTextareaModule  } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { KnobModule } from 'primeng/knob';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { InputIconModule } from 'primeng/inputicon';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { IconFieldModule } from 'primeng/iconfield';
import {HistoriaAcademica} from "../../../domain/HistoriaAcademica";





@Component({
  selector: 'historia-academica-list',
  standalone: true,
  templateUrl: './historia-academica-list.component.html',
  imports:[FormsModule,CommonModule,FileUploadModule,InputTextareaModule,TableModule,KnobModule,ButtonModule,TagModule,PanelModule,CardModule,InputIconModule,ListboxModule,IconFieldModule,OverlayPanelModule],

})
export class HistoriaAcademicaListComponent {
 @Input() historiaAcademicaList: HistoriaAcademica[] =[];
 @Output() eliminarHistoria =  new EventEmitter<HistoriaAcademica>();

  eliminarHistoriaAcademica(historia: HistoriaAcademica): void {
    this.eliminarHistoria.emit(historia);
  }
}
