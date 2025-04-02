import {Component, inject} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {AlumnoService} from "../../../../layout/service/app.alumno.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-mypage',
  standalone: true,
  imports:[FormsModule,CommonModule,FileUploadModule],
  templateUrl: './mypage.component.html',
  styleUrl: './mypage.component.css'
})
export class MypageComponent {
  consulta: string = '';
  private alumService = inject(AlumnoService);
  respuesta = this.alumService.respuesta; // Vinculamos el signal
  uploadedFiles: any;



  consultar() {
    this.alumService.consultar(this.consulta);
  }

  onUpload($event: any) {
    console.log($event)
    this.respuesta.set($event.originalEvent.body)
  }



}
