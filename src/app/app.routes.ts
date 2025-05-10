import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AsistenteComponent } from './core/views/asistente/asistente.component';
import {ComisionesComponent} from "./core/views/comisiones/comisiones/comisiones.component";

export const routes: Routes = [

  {
    path: '',
    component:AppLayoutComponent,
    children:[
      {path:'',component:AsistenteComponent},
      {path:'comisiones',component:ComisionesComponent}
    ]
  }
];
