import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  //inyeccion de servicio
  constructor( private settingsService: SettingsService,
                private sidebarService: SidebarService) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
