import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceTypeService } from './../../../service/invoice-type.service';

@Component({
  selector: 'app-invoice-type',
  templateUrl: './invoice-type.component.html',
  styleUrls: ['./invoice-type.component.scss']
})

export class InvoiceTypeComponent implements OnInit {
  invoiceTypes: any = [];
  displayedColumns = ["InvoiceType", "Action"];
  dataSource: any;

  constructor(
    private location: Location,
    private invoiceTypeService: InvoiceTypeService,

  ) { }

  ngOnInit(): void {
    this.getInvoiceTypes();
  }

  navigateBack() {
    this.location.back();
  };

  getInvoiceTypes() {
    this.invoiceTypeService.getInvoiceTypes().subscribe(data => {
      if (data.success == true) {
        this.invoiceTypes = data.data;
        this.dataSource = new MatTableDataSource(this.invoiceTypes);
      }
    })
  }
};
