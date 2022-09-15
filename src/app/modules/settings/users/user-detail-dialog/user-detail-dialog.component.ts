import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss']
})

export class UserDetailDialogComponent implements OnInit {
  @Input() userDetail: any;

  constructor() { }

  ngOnInit(): void {
  }

}
