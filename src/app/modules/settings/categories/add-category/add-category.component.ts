import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent} from '@angular/material/tabs';
import { MatTabGroup} from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { Location} from '@angular/common'
import { FuseAlertType } from '@fuse/components/alert';
import { CategoriesService } from 'app/service/categories.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
    @ViewChild('userNgForm') userNgForm: NgForm;
    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

    selectedIndex:number;

    categoryForm: UntypedFormGroup;
    isLoginerror: boolean = false;
    submitted: boolean = false;
    showAlert: boolean = false;
    isEditMode : boolean = false;

    imageSrc: string;
    imageData: string;

    categoryId: string;
    categoryData: any;

    subcategoriesList: any[] = [];
    displayedColumns: string[] = ['Icon', 'Sequence', 'Name',  'Active', 'Action'];
    dataSource: any;
    
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
  
    constructor(private _location: Location,
        private _formBuilder: UntypedFormBuilder,
        private sanitizer: DomSanitizer,
        private _categoriesService: CategoriesService,
        private _fuseConfirmationService: FuseConfirmationService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.categoryForm = this._formBuilder.group({
            name : ['', [Validators.required]],
            sequence : ['', [Validators.required]],
            active :[''],
            categoryId:['']
        },)

        this.route.paramMap.subscribe((params: ParamMap) => {             
            this.categoryId= params.get('categoryId');
            if(this.categoryId  != null)
            {
                this.getCategoryById(this.categoryId);
                this.getSubCategoriesList(this.categoryId);
                this.isEditMode = true;
                if(localStorage.getItem('selectedTab') != null)
                {
                    this.selectedIndex = (Number)(localStorage.getItem('selectedTab'));
                }
               
            }
         })
    }

    /*
    * Tab changed event that holds the index of the chosen tab
    */
    tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
        console.log('index => ', tabChangeEvent.index); 
        localStorage.setItem('selectedTab',tabChangeEvent.index.toString());
    }

    /*
     * Navigate back to the previous screen
    */
    navigateBack()
    {
        this._location.back();
    }

     /*
       Edits the current category
    */
     editCategory()
    {
        this.isLoginerror = false;
        this.submitted = true

        // Return if the form is invalid
        if (this.categoryForm.invalid) {
            return;
        }

        // Disable the form
        this.categoryForm.disable();

        // Hide the alert
        this.showAlert = false;
        
        // Gets the picture data
        this.categoryForm.value["icon"]=this.imageData;

        //Call the API to update the category
        this._categoriesService.EditCategory(this.categoryForm.value).subscribe(
        (data) => {
            if(data.success == true)
            {
                this.alert = {
                    type: 'success',
                    message: 'Category updated Successfully!!'
                };
                this.showAlert = true;
                this._location.back();
            }
        })
    }
    
    /*
       Adds a new  category
    */
    addCategory()
    {
        this.isLoginerror = false;
        this.submitted = true

        // Return if the form is invalid
        if (this.categoryForm.invalid) {
            return;
        }
        // Disable the form
        this.categoryForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Put the data of the category from the for in an object
        let CategoryModel={
        name :this.categoryForm.value["name"],
        sequence :this.categoryForm.value["sequence"],
        active :this.categoryForm.value["active"],
        icon : this.imageData
        }

        // Call the api to create the category
        this._categoriesService.AddCategory(CategoryModel).subscribe(
        (data) => {
            if(data.success == true)
            {
            this.alert = {
                type: 'success',
                message: 'Category created Successfully!!'
            };
            this.showAlert = true;
            this._location.back();
            }
        })
    }

     /*
       Gets the category by its unique id
    */
    getCategoryById(Id: string)
    { 
      this._categoriesService.GetCategoryById(Id).subscribe((data) => {
        if(data.success == true)
        {
          this.categoryData = data.data;
          this.imageData = this.categoryData.icon;
  
          this.categoryForm.patchValue(this.categoryData);
        }
      })
    }

    /*
        Retrieves the list of all subcategories for the current category
    */
    getSubCategoriesList(Id:string) {
        this.subcategoriesList = [];

        this._categoriesService.GetSubCategories(Id).subscribe(res => {
        if (res.success == true) { 
            this.subcategoriesList = res.data;
            this.subcategoriesList.forEach(element => {
                if (element.icon != null) {
                let objectURL = element.icon;
                element.icon = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                }
            });
            this.dataSource = new MatTableDataSource(this.subcategoriesList);
        }
        else {
            console.log("Data not found")
        }
        });
    }


 /*
    Deletes a subcategory from the list
  */
    deleteSelectedSubCategory(Id): void {
        const confirmation = this._fuseConfirmationService.open({
          title: 'Delete user',
          message: 'Are you sure you want to remove this subcategory? This action cannot be undone!',
          actions: {
            confirm: {
              label: 'Delete'
            }
          }
        });
        confirmation.afterClosed().subscribe((result) => {
          if (result === 'confirmed') {
            this._categoriesService.DeleteSubCategory(Id).subscribe((data) => {
              if (data.success == true) {
                const index = this.subcategoriesList.findIndex(a => a.subCategoryId == Id);
                if (index >= 0) {
                  this.subcategoriesList.splice(index, 1);
                  this.dataSource = new MatTableDataSource(this.subcategoriesList);
                }
              }
            })
          }
        });
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
        var j= this.categoryForm;
    }
}