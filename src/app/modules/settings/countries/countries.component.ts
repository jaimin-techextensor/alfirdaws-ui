import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { CountriesService } from 'app/service/countries.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-settings',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    countriesList: any[] = [];
    displayedColumns: string[] = ['Icon', 'Name', 'countRegions', 'Active', 'Action'];
    dataSource: any;

    searchTextForModerator: any;
    alert: { type: FuseAlertType; message: string } = {
             type: 'success',
              message: ''
     };
    showAlert = false;

  constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private sanitizer: DomSanitizer,
        private _fuseConfirmationService: FuseConfirmationService,
        private _location: Location,
        private _countriesService: CountriesService
    ) { }

  ngOnInit(): void {
      this.getCountriesList();
   }

  /*----------------------------------------
      Navigate back to the previous screen
  ----------------------------------------*/
  navigateback() {
        this._location.back();
    }


  /*-----------------------------------------------------
    Retrieves the list of all countries from the back-end
  -----------------------------------------------------*/
    getCountriesList() {
    this.countriesList = [];

    this._countriesService.GetCountries().subscribe(res => {
      if (res.success == true) { 
        this.countriesList = res.data;
        this.countriesList.forEach(element => {
            if (element.icon != null) {
              let objectURL = element.icon;
              element.icon = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            }
          });
        this.dataSource = new MatTableDataSource(this.countriesList);
      }
      else {
        console.log("Data not found")
      }
    });
  }

  /*-------------------------------
    Deletes a country from the list
  -------------------------------*/
  deleteSelectedCountry(Id): void {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete country',
      message: 'Are you sure you want to remove this country? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._countriesService.DeleteCountry(Id).subscribe((data) => {
          if (data.success == true) {
            const index = this.countriesList.findIndex(a => a.countryId == Id);
            if (index >= 0) {
              this.countriesList.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.countriesList);
            }
          }
        })
      }
    });
  }

}