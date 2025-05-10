import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inscripciones',
                items: [
                    { label: 'Asistente cupos', icon: 'pi pi-fw pi-microchip-ai', routerLink: ['/'] },
                    { label: 'Plan de estudio', icon: 'pi pi-fw pi-calendar', routerLink: ['/plan'] },
                  { label: 'Comisiones', icon: 'pi pi-fw pi-folder', routerLink: ['/comisiones'] },
                  { label: 'Historia academica', icon: 'pi pi-fw pi-user', routerLink: ['/alumnos'] },



                ]
            },

        ];
    }
}
