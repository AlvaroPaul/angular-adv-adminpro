import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  //public links: any[] | NodeListOf<Element> = [];//hace lo mismo que la de arriba

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
   this.settingsService.checkCurrentTheme();
  }

  changeTheme( theme: string ){
    this.settingsService.changeTheme(theme);
  }

}
