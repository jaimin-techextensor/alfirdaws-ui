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
    @ViewChild('userNgForm') userNgForm: NgForm;
    roleForm: UntypedFormGroup;
    isLoginerror: boolean = false;
    submitted: boolean = false;
    showAlert: boolean = false;
    isEditMode : boolean = false;

    roleId: string;
    roleType: string
    roleData: any;
    
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
  
    constructor(private _location: Location,
        private _formBuilder: UntypedFormBuilder,
        private _rolesService: RolesService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.roleType = "false";
        this.roleForm = this._formBuilder.group({
            name : ['', [Validators.required]],
            isStatic : ['false', [Validators.required]],
            description :[''],
            roleId:['']
        },)

        this.route.paramMap.subscribe((params: ParamMap) => {             
            this.roleId= params.get('roleId');
            if(this.roleId  != null)
            {
                this.getRole(this.roleId);
                this.isEditMode = true;
            }
         })
    }

    // Navigate back to the previous screen
    navigateBack()
    {
        this._location.back();
    }

    // Add a new role 
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
        
        //Create the role object based on the data of the form
        let RoleModel={
            name :this.roleForm.value["name"],
            isStatic : this.roleForm.value["isStatic"]=="true"?true:false,
            description :this.roleForm.value["description"],
           
        }

        //Add the role through the API
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

    // Edit an existing role
    editRole(): void 
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
            roleId :this.roleForm.value["roleId"],
            name :this.roleForm.value["name"],
            isStatic: this.roleForm.value["isStatic"] == "true"? true:false,
            description :this.roleForm.value["description"]
          }

       //Edit the role through the API
        this._rolesService.EditRole(RoleModel).subscribe(
            (data) => {
                if(data.success == true)
                {
                    this.alert = {
                        type: 'success',
                        message: 'Role updated Successfully!!'
                    };
                    this.showAlert = true;
                    this._location.back();
                }
            }
        )
    }

    // Retrieve the data of a specific role
    getRole(Id: string){ 
        this._rolesService.GetRole(Id).subscribe((data) => {
            if(data.success == true)
            {
                this.roleData = data.data;
                this.roleForm.patchValue({name: this.roleData.name});
                this.roleForm.patchValue({roleId: this.roleData.roleId});
                this.roleForm.patchValue({description: this.roleData.description});
                this.roleForm.patchValue({isStatic: this.roleData.isStatic == true? "true":"false"});
            }
        }
        )
    }
}
