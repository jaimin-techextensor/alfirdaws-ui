import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { ModlsService } from 'app/service/modls.services';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-settings',
  templateUrl: './modls.component.html',
  styleUrls: ['./modls.component.scss']
})
export class ModlsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    modlsList: any[] = [];
    displayedColumns: string[] = ['Name', 'Description'];
    dataSource: any;

    visible: boolean = false;
    selectedRow: any;

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
        private _mdlsService: ModlsService
    ) { }

  ngOnInit(): void {
      this.getModuleList();
   }

    /*
        Navigate back to the previous screen
    */
  navigateback() {
        this._location.back();
    }

  /*
    Retrieves the list of all modules from the back-end
  */
  getModuleList() {
    this.modlsList = [];

    this._mdlsService.GetModulesList().subscribe(res => {
      if (res.success == true) { 
        this.modlsList = res.data;
        this.dataSource = new MatTableDataSource(this.modlsList);
      }
      else {
        console.log("Data not found")
      }
    });
  }

  /*
    When the user clicks on a specific ro in the table
  */
    onRowClick(event: any, rowData: any) {
      if (!(event.srcElement instanceof SVGElement)) {
        this.visible = true;//!this.visible;
        if (rowData) {
          this.selectedRow = rowData;
        }
      }
    }

}