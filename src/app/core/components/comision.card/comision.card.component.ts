import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Comision} from "../../domain/Comision";
import { CardModule } from 'primeng/card';
import { KnobModule } from 'primeng/knob';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-comision-card',
  standalone: true,
  imports: [CommonModule,CardModule,KnobModule,ProgressBarModule,ToastModule],
  templateUrl: './comision.card.component.html',
  styleUrl: './comision.card.component.css'
})
export class ComisionCardComponent {
  @Input() comision!: Comision;
}
