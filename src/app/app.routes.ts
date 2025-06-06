import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/component/app.layout.component';
import { AsistenteComponentDefault } from './core/views/asistente/asistente-component-default.component';
import {ComisionesComponent} from "./core/views/comisiones/comisiones/comisiones.component";
import {AsistenteComponent} from "./asistente-inscripcion/asistente-inscripcion.component";

export const routes: Routes = [

  {
    path: '',
    component:AppLayoutComponent,
    children:[
      {path:'',component:AsistenteComponent},
      {path:'asistente',component:AsistenteComponent},
      {path:'default',component:AsistenteComponentDefault},
      {path:'comisiones',component:ComisionesComponent}
    ]
  }
];
