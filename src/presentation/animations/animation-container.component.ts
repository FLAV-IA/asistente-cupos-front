// animacion-placeholder.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import { ButtonModule } from 'primeng/button';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@Component({
  selector: 'animacion-placeholder',
  standalone: true,
  imports: [CommonModule, LottieComponent, ButtonModule],
  template: `
    <div class="flex flex-column align-items-center justify-content-center mt-5 gap-3 text-center">
      <p-button
        *ngIf="mostrarBoton"
        [label]="botonLabel"
        icon="pi pi-replay"
        severity="secondary"
        styleClass="p-button-rounded"
        (click)="accionBoton?.()"
      ></p-button>
      <ng-lottie
        [options]="{ path: path, autoplay: true, loop: true }"
        [style.max-width.px]="width"
        [style.height.px]="height"
      ></ng-lottie>
      <p class="text-2xl text-gray-600">{{ mensaje }}</p>
    </div>
  `
})
export class AnimacionPlaceholderComponent {
  @Input() path!: string;
  @Input() mensaje = 'Sin resultados';
  @Input() width = 200;
  @Input() height = 200;
  @Input() botonLabel : string|undefined = 'Reintentar';
  @Input() mostrarBoton = false;
  @Input() accionBoton?: () => void;
}
