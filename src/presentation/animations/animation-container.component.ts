// animacion-placeholder.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import player from 'lottie-web';
import {AnimationOptions} from "ngx-lottie";
import { LottieComponent } from 'ngx-lottie'
export function playerFactory() {
  return player;
}

@Component({
  selector: 'animacion-placeholder',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  template: `
    <div class="flex flex-column align-items-center justify-content-center mt-5">
      <ng-lottie
        [options]="{
          path: path,
          autoplay: true,
          loop: true
        }"
        [style.max-width.px]="width"
        [style.height.px]="height">
      </ng-lottie>
      <p class="mt-3 text-center text-gray-500">{{ mensaje }}</p>
    </div>
  `
})
export class AnimacionPlaceholderComponent {
  @Input() path!: string;
  @Input() mensaje = 'Sin resultados';
  @Input() width = 200;
  @Input() height = 200;
}
