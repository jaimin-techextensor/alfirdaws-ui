import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent} from '@angular/material/tabs';
import { MatTabGroup} from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { Location} from '@angular/common'
import { FuseAlertType } from '@fuse/components/alert';
import { CountriesService } from 'app/service/countries.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
    @ViewChild('userNgForm') userNgForm: NgForm;
    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

    selectedIndex:number;

    countryForm: UntypedFormGroup;
    isLoginerror: boolean = false;
    submitted: boolean = false;
    showAlert: boolean = false;
    isEditMode : boolean = false;

    imageSrc: string;
    imageData: string;

    countryId: string;
    countryData: any;

    //subcategoriesList: any[] = [];
    //displayedColumns: string[] = ['Icon', 'Sequence', 'Name',  'Active', 'Action'];
    //dataSource: any;
    
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
  
    constructor(private _location: Location,
        private _formBuilder: UntypedFormBuilder,
        private sanitizer: DomSanitizer,
        private _countryService: CountriesService,
        private _fuseConfirmationService: FuseConfirmationService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.countryForm = this._formBuilder.group({
            name : ['', [Validators.required]],
            active :[''],
            countryId:['']
        },)

        this.route.paramMap.subscribe((params: ParamMap) => {             
            this.countryId= params.get('countryId');
            if(this.countryId  != null)
            {
                this.getCountryById(this.countryId);
                //this.getSubCategoriesList(this.categoryId);
                this.isEditMode = true;
                if(localStorage.getItem('selectedTab') != null)
                {
                    this.selectedIndex = (Number)(localStorage.getItem('selectedTab'));
                }
               
            }
         })
    }

    /*
     * Navigate back to the previous screen
    */
        navigateBack()
        {
            localStorage.removeItem('selectedTab');
            this._location.back();
        }

    /*
    * Tab changed event that holds the index of the chosen tab
    */
    tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
        console.log('index => ', tabChangeEvent.index); 
        localStorage.setItem('selectedTab',tabChangeEvent.index.toString());
    }

    /*
       Adds a new country
    */
    addCountry(){
        this.isLoginerror = false;
        this.submitted = true
        localStorage.clear();

        // Return if the form is invalid
        if (this.countryForm.invalid) {
            return;
        }
        // Disable the form
        this.countryForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Put the data of the category from the for in an object
        let CountryModel={
        name :this.countryForm.value["name"],
        active :this.countryForm.value["active"],
        icon : this.imageData
        }

        // Call the api to create the category
        this._countryService.AddCountry(CountryModel).subscribe(
        (data) => {
            if(data.success == true)
            {
            this.alert = {
                type: 'success',
                message: 'Country created Successfully!!'
            };
            this.showAlert = true;
            this._location.back();
            }
        })
    }

    /*
       Edits the current country
    */
    editCountry()
    {
        this.isLoginerror = false;
        this.submitted = true
        localStorage.clear();

        // Return if the form is invalid
        if (this.countryForm.invalid) {
            return;
        }

        // Disable the form
        this.countryForm.disable();

        // Hide the alert
        this.showAlert = false;
        
        // Gets the picture data
        this.countryForm.value["icon"]=this.imageData;

        //Call the API to update the category
        this._countryService.EditCountry(this.countryId, this.countryForm.value).subscribe(
        (data) => {
            if(data.success == true)
            {
                this.alert = {
                    type: 'success',
                    message: 'Country updated Successfully!!'
                };
                this.showAlert = true;
                this._location.back();
            }
        })
    }


    /*
       Gets the category by its unique id
    */
    getCountryById(Id: string)
    { 
        this._countryService.GetCountryById(Id).subscribe((data) => {
            if(data.success == true)
            {
                this.countryData = data.data;
                this.imageData = this.countryData.icon;
        
                this.countryForm.patchValue(this.countryData);
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
        this.imageData = reader.result;
        this.imageSrc = reader.result.split(',')[1];
        var j = this.countryForm;
    }
}