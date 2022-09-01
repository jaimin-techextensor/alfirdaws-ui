import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Location} from '@angular/common'
import { FuseValidators } from '@fuse/validators';
import { FuseAlertType } from '@fuse/components/alert';
import { PasswordStrengthValidator } from 'app/shared/helpers/password-strength.validators';
import { UsersService } from 'app/service/users.service';
import { RolesService } from 'app/service/roles.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatOption } from '@angular/material/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild('userNgForm') userNgForm: NgForm; 
  userForm: UntypedFormGroup;
  roleForm: UntypedFormGroup;

  isLoginerror = false;
  submitted: boolean = false;
  showAlert: boolean = false;

  imageSrc: string;
  imageData: string;
  userId:string;
  userData : any;
  
  roleData: any;
  rolesList: any[] = [];
  displayedColumns: string[] = ['RoleName',  'Action'];
  dataSource: any;


  selectedRoleId: string;
  selectedRoleName: string;

  isEditMode : boolean=false;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
};
  constructor(private _location: Location,
    private _formBuilder: UntypedFormBuilder,
    private _userService : UsersService,
    private _roleService: RolesService,
    private _fuseConfirmationService: FuseConfirmationService,
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
      }
    )

    this.roleForm = this._formBuilder.group({
      name:  ['']
    })
    
    //Retrieves the information of the selected user in edit modus
    this.route.paramMap.subscribe((params: ParamMap) => {    
        this.userId= params.get('userId');
        if(this.userId  != null)
        {
          //Get the current user information
          this.GetUsers(this.userId);

          //Get the list of all available roles
          this.GetRoles();

          this.isEditMode = true;
        }
      }
    )


           
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

  /*
    * Retrieves the information of the selected user
  */
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

          if(this.userData.assignedRoles != null)
          {
            this.rolesList = this.userData.assignedRoles; 
          }
          this.dataSource = new MatTableDataSource(this.rolesList);
        }
      }
    )
  }

   /*
    * Get the list of all available roles
  */
  GetRoles()
  {
    this._roleService.GetRolesList(1 , 20).subscribe((data) => {
        if(data.success == true)
        {
          this.roleData = data.data;
        }
      }
    )
  }

  /*
    Assign role to user
  */ 
  AssignRole()
  {
    //Add the selected role to the role list
    if(this.selectedRoleId != null)
    { 
      let exists = this.rolesList.find(r => r.roleId === this.selectedRoleId);
      if(exists != undefined){
          this.alert = {
            type: 'warning',
            message: 'Role already assigned to user!!'
        };
        this.showAlert = true;  
        setTimeout(()=>{
          this.showAlert = false;
        },2000); 
      }
      else
      {
        //Add the assigned rol to the back-end
        this._userService.AssignRole(this.userId, this.selectedRoleId).subscribe((data) => {
            if(data.success == true)
            {
              const role = {
                name: this.selectedRoleName,
                roleId: this.selectedRoleId
              }
              //Add the selected role to the list
              this.rolesList.push(role);

              //Update the data source of the table
              this.dataSource = new MatTableDataSource(this.rolesList);
            }
        });
      }
    }
  }


  /*
    Assign role to user
  */ 
    RemoveRole(roleId: string)
    {
      //Visualize a confirmation window before removing the role
      const confirmation = this._fuseConfirmationService.open({
        title: 'Delete role asignment',
        message: 'Are you sure you want to remove this role assignment? This action cannot be undone!',
        actions: {
          confirm: {
            label: 'Delete'
          }
        }
      });

      confirmation.afterClosed().subscribe((result) => {
        if (result === 'confirmed') {
          
          //Remode the assigned rol from the back-end
          this._userService.RemoveRole(this.userId, roleId).subscribe((data) => {
            if(data.success == true)
            {
             
              //Search the index of the role in the list and remove the role from the list
              const index = this.rolesList.findIndex(a => a.roleId == roleId);
              if (index >= 0) {
                this.rolesList.splice(index, 1);
                this.dataSource = new MatTableDataSource(this.rolesList);
              }
            }
          });
        }
      });
  }

  /*
    Event to capture the selected role from the dropdown element
  */
  selectedRole(event: MatSelectChange) 
  {
    //Capture the selected role id and name from the dropdown
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };

    //Set the selected id of the role
    this.selectedRoleId = selectedData.value;

    //Set the selected name of the role
    this.selectedRoleName = selectedData.text
    
    console.log(selectedData);
  }
}
