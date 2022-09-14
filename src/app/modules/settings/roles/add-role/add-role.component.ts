import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { RolesService } from 'app/service/roles.service';
@Component({
    selector: 'app-add-user',
    templateUrl: './add-role.component.html',
    styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
    displayedColumns: string[] = ['module', 'create', 'read', 'update', 'delete'];
    dataSource: any;
    @ViewChild('userNgForm') userNgForm: NgForm;
    roleForm: UntypedFormGroup;
    isLoginerror: boolean = false;
    submitted: boolean = false;
    showAlert: boolean = false;
    isEditMode: boolean = false;
    roleModules: any = [];
    rolePermissions: any = [];
    roleId: string;
    roleType: string
    roleData: any;
    Permissions: any = []
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
            name: ['', [Validators.required]],
            isStatic: ['false', [Validators.required]],
            description: [''],
            roleId: [''],
            permissions: []
        },)

        this.route.paramMap.subscribe((params: ParamMap) => {
            this.roleId = params.get('roleId');
            if (this.roleId != null) {
                this.getRole(this.roleId);
                this.isEditMode = true;
            }
        })

        if (!this.roleId) {
            this.getAllRoleModules();
        }
    }

    // Navigate back to the previous screen
    navigateBack() {
        this._location.back();
    }

    // Add a new role 
    addRole() {
        this.isLoginerror = false;
        this.submitted = true
        // Return if the form is invalid
        if (this.roleForm.invalid) {
            return;
        }
        // Disable the form
        this.roleForm.disable();
        // Hide the alert
        this.showAlert = false;
        //Create the role object based on the data of the form
        let RoleModel = {
            name: this.roleForm.value["name"],
            isStatic: this.roleForm.value["isStatic"] == "true" ? true : false,
            description: this.roleForm.value["description"],
            permissions: this.rolePermissions
        }

        //Add the role through the API
        this._rolesService.AddRole(RoleModel).subscribe(
            (data) => {
                if (data.success == true) {
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
    editRole(): void {
        this.isLoginerror = false;
        this.submitted = true
        // Return if the form is invalid
        if (this.roleForm.invalid) {
            return;
        }
        // Disable the form
        this.roleForm.disable();
        // Hide the alert
        this.showAlert = false;
        let RoleModel = {
            roleId: this.roleForm.value["roleId"],
            name: this.roleForm.value["name"],
            isStatic: this.roleForm.value["isStatic"] == "true" ? true : false,
            description: this.roleForm.value["description"],
            permissions: this.roleForm.value['permissions']
        }
        //Edit the role through the API
        this._rolesService.EditRole(RoleModel).subscribe(
            (data) => {
                if (data.success == true) {
                    this.alert = {
                        type: 'success',
                        message: 'Role updated Successfully!!'
                    };
                    this.showAlert = true;
                    this.getLatestRolePermissions();
                    this._location.back();
                }
            }
        )
    }

    getLatestRolePermissions() {
        var user: any = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this._rolesService.getRolePermissionByUser(user.id).subscribe(res => {
                if (res && res.success) {
                    var permissions = [];
                    if (res.data.length > 0) {
                        var i = 0;
                        res.data.forEach(role_permission => {
                            if (role_permission && role_permission.permissions.length > 0) {
                                if (i == 0) {
                                    permissions = role_permission.permissions;
                                } else {
                                    Array.prototype.push.apply(permissions, role_permission.permissions);
                                }
                            }
                            i++;
                        });
                        localStorage.setItem('role-permissions', JSON.stringify(permissions));

                    }
                }
            });
        }
    }
    // Retrieve the data of a specific role
    getRole(Id: string) {
        this._rolesService.GetRole(Id).subscribe((data) => {
            if (data.success == true) {
                if (data.data.permissions.length > 0) {
                    this.rolePermissions = [];
                    data.data.permissions.forEach(element => {
                        const permission = {
                            moduleId: element.moduleId,
                            module: element.moduleName,
                            create: element.create,
                            update: element.update,
                            read: element.read,
                            delete: element.delete,
                            permissionId: element.permissionId
                        };
                        this.rolePermissions.push(permission);
                    });
                    this.dataSource = new MatTableDataSource(this.rolePermissions);
                } else {
                    this.getAllRoleModules();
                }
                this.roleData = data.data;
                this.roleForm.patchValue({ name: this.roleData.name });
                this.roleForm.patchValue({ roleId: this.roleData.roleId });
                this.roleForm.patchValue({ description: this.roleData.description });
                this.roleForm.patchValue({ isStatic: this.roleData.isStatic == true ? "true" : "false" });
                this.roleForm.patchValue({ permissions: this.rolePermissions });
            }
        }
        )
    }

    getAllRoleModules() {
        this._rolesService.getRolesModels().subscribe(data => {
            data.data.forEach(element => {
                const permission = {
                    moduleId: element.moduleId,
                    module: element.name,
                    create: element.create ? element.create : false,
                    update: element.update ? element.update : false,
                    read: element.read ? element.read : false,
                    delete: element.delete ? element.delete : false
                };
                this.rolePermissions.push(permission);
            });
            this.dataSource = new MatTableDataSource(this.rolePermissions);
        })
    }
}
