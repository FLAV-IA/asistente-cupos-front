import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { AppLayoutModule } from '../presentation/layout/app.layout.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppLayoutModule, FormsModule],

  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Asistente ';
}
