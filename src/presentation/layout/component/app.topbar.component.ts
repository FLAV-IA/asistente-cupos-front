import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) {}

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const clickedInsideMenu = this.menu?.nativeElement.contains(event.target);
    const clickedMenuButton = this.topbarMenuButton?.nativeElement.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton && this.layoutService.state.profileSidebarVisible) {
      this.layoutService.state.profileSidebarVisible = false;
    }
  }
}
