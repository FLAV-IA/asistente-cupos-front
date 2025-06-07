import { Routes } from '@angular/router';
import { AppLayoutComponent } from '../presentation/layout/app.layout.component';
import { ComisionesComponent } from '../presentation/views/comisiones/comisiones/comisiones.component';
import { AsistenteComponent } from '../presentation/asistente-inscripcion/asistente-inscripcion.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: AsistenteComponent },
      { path: 'comisiones', component: ComisionesComponent },
    ],
  },
];
