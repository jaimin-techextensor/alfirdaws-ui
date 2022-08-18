import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
  userForm: UntypedFormGroup;

  constructor(private _location: Location,private _formBuilder: UntypedFormBuilder,
    ) { }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      firstname : ['', [Validators.required]],
      lastname : ['', [Validators.required]],
      email :['', [Validators.required]],
      username :['', [Validators.required]],
      password : [''],
      repetepassword : [''],
      shouldchangepasswordonnextlogin : [''],
      sendactivationemail : [''],
      active : ['']
    })
  }
  back()
  {
    this._location.back();
  }
}
