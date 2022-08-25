import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Location} from '@angular/common'
import { FuseAlertType } from '@fuse/components/alert';
import { RolesService } from 'app/service/roles.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  roleForm: UntypedFormGroup;
  isLoginerror = false;
  submitted: boolean = false;

  @ViewChild('userNgForm') userNgForm: NgForm;
  showAlert: boolean = false;

  roleId:string;
  roleType:string
  roleData : any;
  isEditMode : boolean=false;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
};
  constructor(private _location: Location,
    private _formBuilder: UntypedFormBuilder,
    private _rolesService : RolesService,
    private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.roleType = "false";
        this.roleForm = this._formBuilder.group({
            name : ['', [Validators.required]],
            isStatic : ["false", [Validators.required]],
            description :[''],
            roleId:['']
          },)

    }

    navigateBack()
    {
        this._location.back();
    }

    addRole()
    {
        
        this.isLoginerror = false;
        this.submitted = true
        localStorage.clear();

        // Return if the form is invalid
        if (this.roleForm.invalid) {
            return;
        }
        
        // Disable the form
        this.roleForm.disable();
        // Hide the alert
        this.showAlert = false;
        
        let RoleModel={
            name :this.roleForm.value["name"],
            isStatic : this.roleForm.value["isStatic"]=="true"?true:false,
            description :this.roleForm.value["description"],
           
        }
        this._rolesService.AddRole(RoleModel).subscribe(
            (data) => {
            if(data.success == true)
            {
                this.alert = {
                type: 'success',
                message: 'Role created successfully!!'
            };
                this.showAlert = true;
                this._location.back();
            }
        })
    }

    editRole()
    {
        this._location.back();
    }

}
