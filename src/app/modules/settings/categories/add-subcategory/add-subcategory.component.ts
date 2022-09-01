import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Location} from '@angular/common'
import { FuseAlertType } from '@fuse/components/alert';
import { CategoriesService } from 'app/service/categories.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
    @ViewChild('userNgForm') userNgForm: NgForm;
    subcategoryForm: UntypedFormGroup;
    isLoginerror: boolean = false;
    submitted: boolean = false;
    showAlert: boolean = false;
    isEditMode : boolean = false;

    imageSrc: string;
    imageData: string;

    categoryId:string;
    subcategoryId: string;
    subcategoryData: any;

    numberRegEx = /\-?\d*\.?\d{1,2}/;

    
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
  
    constructor(private _location: Location,
        private _formBuilder: UntypedFormBuilder,
        private sanitizer: DomSanitizer,
        private _categoriesService: CategoriesService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.subcategoryForm = this._formBuilder.group({
            name : ['', [Validators.required]],
            sequence : ['', [Validators.required], Validators.pattern(this.numberRegEx)],
            active :[''],
            subcategoryId:['']
        },)

        this.route.paramMap.subscribe((params: ParamMap) => {    
            this.categoryId = params.get('categoryId')         
            this.subcategoryId= params.get('subcategoryId');
            if(this.subcategoryId  != null)
            {
                this.getSubCategoryById(this.subcategoryId);
                this.isEditMode = true;
            }
         })
    }

    /*
     * Navigate back to the previous screen
    */
    navigateBack()
    {
        // Disable the form
        this.subcategoryForm.disable();
        
        //Navigate back to the previous screen
        this._location.back();
    }

     /*
       Edits the current subcategory
    */
     editSubCategory()
    {
        this.isLoginerror = false;
        this.submitted = true
        //localStorage.clear();

        // Return if the form is invalid
        if (this.subcategoryForm.invalid) {
            return;
        }

        // Disable the form
        this.subcategoryForm.disable();

        // Hide the alert
        this.showAlert = false;
        
        // Gets the picture data
        this.subcategoryForm.value["icon"]=this.imageData;

        // Put the data of the subcategory from the form in an object
        let subcategoryModel={
            subCategoryId: this.subcategoryId,
            name :this.subcategoryForm.value["name"],
            sequence :this.subcategoryForm.value["sequence"],
            active :this.subcategoryForm.value["active"],
            icon : this.imageData
            }

        //Call the API to update the subcategory in the back-end
        this._categoriesService.EditSubCategory(this.categoryId, subcategoryModel).subscribe(
        (data) => {
            if(data.success == true)
            {
                this.alert = {
                    type: 'success',
                    message: 'Subcategory updated successfully!!'
                };
                this.showAlert = true;
                this._location.back();
            }
        })
    }
    
    /*
       Adds a new  subcategory 
    */
    addSubCategory()
    {
        this.isLoginerror = false;
        this.submitted = true
        //localStorage.clear();

        // Return if the form is invalid
        if (this.subcategoryForm.invalid) {
            return;
        }
        // Disable the form
        this.subcategoryForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Put the data of the subcategory from the form in an object
        let subcategoryModel={
            name :this.subcategoryForm.value["name"],
            sequence :this.subcategoryForm.value["sequence"],
            active :this.subcategoryForm.value["active"],
            icon : this.imageData
            }

        // Call the api to create the category
        this._categoriesService.AddSubCategory(this.categoryId, subcategoryModel).subscribe(
        (data) => {
            if(data.success == true)
            {
                this.alert = {
                    type: 'success',
                    message: 'Subcategory created Successfully!!'
                };
                this.showAlert = true;
                this._location.back();
            }
        })
    }

     /*
       Gets the category by its unique id
    */
    getSubCategoryById(Id: string)
    { 
      this._categoriesService.GetSubCategoryById(Id).subscribe((data) => {
        if(data.success == true)
        {
          this.subcategoryData = data.data;
          this.imageData = this.subcategoryData.icon;
  
          this.subcategoryForm.patchValue(this.subcategoryData);
        }
      })
    }


     /*
       Opens an image file from the browser.
    */
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

    /*
        Reads the file from disk into memory
    */
    handleFileLoaded(e) {
        const reader = e.target;
        this.imageData =reader.result;
        this.imageSrc= reader.result.split(',')[1];
        var j= this.subcategoryForm;
    }
}