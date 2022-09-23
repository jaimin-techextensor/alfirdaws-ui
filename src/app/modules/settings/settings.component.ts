import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingService } from './../../service/setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  counterList: any;

  constructor(
    private router: Router,
    private settingService: SettingService
  ) { }

  ngOnInit(): void {
    this.settingsCounter();

  }

  settingsCounter() {
    this.settingService.getCounters().subscribe(res => {
      if (res.success == true) {
        this.counterList = res.data;
        localStorage.setItem("counter-data", JSON.stringify(res.data))
      }
    })
  }

  navigateToUsers() {
    this.router.navigateByUrl('/users');
  }

  navigateToRoles() {
    this.router.navigateByUrl('/roles');
  }

  navigateToModules() {
    this.router.navigateByUrl('/modules');
  }

  navigateToCategories() {
    this.router.navigateByUrl('/categories');
  }

  navigateToCountries() {
    this.router.navigateByUrl('/countries');
  }

  navigateToCampaigns() {
    this.router.navigateByUrl('/campaigns');
  }
  navigateTosubscription() {
    this.router.navigateByUrl('/subscription-model');
  }
}
