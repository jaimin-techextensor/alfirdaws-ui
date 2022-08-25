import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common'
import { FuseValidators } from '@fuse/validators';
import { FuseAlertType } from '@fuse/components/alert';
import { PasswordStrengthValidator } from 'app/shared/helpers/password-strength.validators';
import { UsersService } from 'app/service/users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: UntypedFormGroup;
  isLoginerror = false;
  submitted: boolean = false;
  @ViewChild('userNgForm') userNgForm: NgForm;
  showAlert: boolean = false;
  imageSrc: string;
  imageData: string;
  userId:string;
  userData : any;
  isEditMode : boolean=false;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
};
  constructor(private _location: Location,
    private _formBuilder: UntypedFormBuilder,
    private _userService : UsersService,
    private route: ActivatedRoute
    ) { }


  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      name : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      email :['', [Validators.required,Validators.email]],
      userName :['', [Validators.required]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), PasswordStrengthValidator])],
      repeatpassword : ['',[Validators.required]],
      changePwdAtNextLogin : [''],
      sendActivationEmail : [''],
      active : [''],
      picture:[''],
      userId:['']
    },
            {
                validators: FuseValidators.mustMatch('password', 'repeatpassword')
            })
            this.route.paramMap.subscribe((params: ParamMap) => {
               
              this.userId= params.get('userId');
              if(this.userId  != null)
              {
                this.GetUsers(this.userId);
                this.isEditMode = true;
              }
            })
           
  }
  back()
  {
    this._location.back();
  }
  addUser(): void {
    this.isLoginerror = false;
    this.submitted = true
    localStorage.clear();
    // Return if the form is invalid
    if (this.userForm.invalid) {
        return;
    }
    // Disable the form
      this.userForm.disable();
      // Hide the alert
      this.showAlert = false;
      let UserModel={
        userName :this.userForm.value["userName"],
        name :this.userForm.value["name"],
        lastName :this.userForm.value["lastName"],
        picture : this.imageData,
        email : this.userForm.value["email"],
        active : this.userForm.value["active"],
        password: this.userForm.value["password"],
        changePwdAtNextLogin: this.userForm.value["changePwdAtNextLogin"],
        sendActivationEmail:this.userForm.value["sendActivationEmail"]
      }
      this._userService.AddUser(UserModel).subscribe(
        (data) => {
          if(data.success == true)
          {
            this.alert = {
              type: 'success',
              message: 'User Created Successfully!!'
           };
           this.showAlert = true;
            this._location.back();
          }
        })
  }

  editUser(): void {
    this.isLoginerror = false;
    this.submitted = true
    localStorage.clear();
    // Return if the form is invalid
    if (this.userForm.invalid) {
        return;
    }
    // Disable the form
      this.userForm.disable();
      // Hide the alert
      this.showAlert = false;
     
    this.userForm.value["picture"]=this.imageData;
    this._userService.EditUser(this.userForm.value).subscribe(
      (data) => {
        if(data.success == true)
        {
          this.alert = {
            type: 'success',
            message: 'User Created Successfully!!'
         };
         this.showAlert = true;
          this._location.back();
        }
      })
  }
  onFileSelect(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this.handleFileLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  handleFileLoaded(e) {
    const reader = e.target;
    this.imageData =reader.result;
    this.imageSrc= reader.result.split(',')[1];
    var j= this.userForm;
  }
  GetUsers(Id: string)
  { 
    this._userService.GetUser(Id).subscribe((data) => {
      if(data.success == true)
      {
        this.userData = data.data;
        this.imageData = this.userData.picture;
        this.userForm.get("repeatpassword").setValue(this.userData.password);
        this.userForm.value["userId"]=this.userData.userId;

        this.userForm.patchValue(this.userData);
      }
    })
  }
}