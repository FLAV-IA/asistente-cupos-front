import {Component, EventEmitter, Input, Output} from '@angular/core';

import { CardModule } from 'primeng/card';
import { KnobModule } from 'primeng/knob';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import {CommonModule} from "@angular/common";
import { Comision } from '../../../domain/Comision';
@Component({
  selector: 'app-comision-card',
  standalone: true,
  imports: [CommonModule,CardModule,KnobModule,ProgressBarModule,ToastModule],
  templateUrl: './comision.card.component.html'
})
export class ComisionCardComponent {
  @Input() comision!: Comision;
}
