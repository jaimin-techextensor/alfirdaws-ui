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
import { ThisReceiver } from '@angular/compiler';

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
    regionForm:UntypedFormGroup;

    isLoginerror: boolean = false;
    submitted: boolean = false;
    showAlert: boolean = false;
    isEditMode : boolean = false;

    imageSrc: string;
    imageData: string;

    countryId: string;
    regionId: string;
    countryData: any;

    regionsList: any[] = [];
    displayedColumns: string[] = ['Region', 'Action'];
    dataSource: any;
    isRegionSelected: boolean = false;
    selectedRegion: any;
    
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

        this.regionForm = this._formBuilder.group({
            name : ['', [Validators.required]],
        },)

        this.route.paramMap.subscribe((params: ParamMap) => {             
            this.countryId= params.get('countryId');
            if(this.countryId  != null)
            {
                this.getCountryById(this.countryId);
                this.isEditMode = true; 
            }
         })
    }

    /*
     * Navigate back to the previous screen
    */
        navigateBack()
        {
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

        // Return if the form is invalid
        if (this.countryForm.invalid) {
            return;
        }
        // Disable the form
        this.countryForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Put the data of the category from the form in a country object
        let CountryModel={
            name :this.countryForm.value["name"],
            active :this.countryForm.value["active"] == "" ?false:true,
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
       Gets the country and its regions by the unique id of the country
    */
    getCountryById(Id: string)
    { 
        this._countryService.GetCountryById(Id).subscribe((data) => {
            if(data.success == true)
            {
                this.countryData = data.data;
                this.imageData = this.countryData.icon;
                this.countryForm.patchValue(this.countryData);

                this.regionsList = this.countryData.regions;
                this.dataSource = new MatTableDataSource(this.regionsList);
            }
        })
    }

    /*
       Adds a new region for the current country to the back-end
    */
    addRegion(){
        this.isLoginerror = false;
        this.submitted = true

        // Return if the form is invalid
        if (this.regionForm.invalid) {
            return;
        }
        // Disable the form
        this.regionForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Put the data of the region from the form in an object
        let RegionModel={
        name :this.regionForm.value["name"],
        }

        // Call the api to create the region
        this._countryService.AddRegion(this.countryId, RegionModel).subscribe(
        (data) => {
            if(data.success == true)
            {
                this.alert = {
                    type: 'success',
                    message: 'Region created Successfully!!'
                };
                this.showAlert = true;
                
                //Wait for 1,5 seconds
                setTimeout(() => {
                    this.showAlert = false;
                  }, 1500);

               //Refresh the data
               this.getCountryById(this.countryId);

               //Clear the form
               this.regionForm.clearValidators();
               this.regionForm.reset();
               this.regionForm.enable();
            }
        })

    }


    editRegion(){

        this.isLoginerror = false;
        this.submitted = true

        // Return if the form is invalid
        if (this.regionForm.invalid) {
            return;
        }
        // Disable the form
        this.regionForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Put the data of the region from the form in an object
        let RegionModel={
        name :this.regionForm.value["name"],
        }

        // Call the api to create the region
        this._countryService.EditRegion(this.countryId, this.regionId, RegionModel).subscribe(
        (data) => {
            if(data.success == true)
            {
                this.alert = {
                    type: 'success',
                    message: 'Region created Successfully!!'
                };
                this.showAlert = true;
                
                //Wait for 1,5 seconds
                setTimeout(() => {
                    this.showAlert = false;
                  }, 1500);

                //Update the region in the list of regions
                const index = this.regionsList.findIndex(a => a.regionId == this.regionId);
                if (index >= 0) {
                    const region = {
                        name: this.regionForm.value["name"],
                        regionId: this.regionId
                      }
                    this.regionsList[index] = region;
                    this.dataSource = new MatTableDataSource(this.regionsList);
                }

               //Clear the form
               this.regionForm.setValue({name: null });  
               this.regionForm.enable();

               //Reset the selected region
               this.isRegionSelected = false;
               this.selectedRegion = null;
               this.regionId = "";
            }
        })

    }

    /*
       Deletes the selected region
    */
    deleteSelectedRegion(Id:string)
    {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete region',
            message: 'Are you sure you want to remove this region? This action cannot be undone!',
            actions: {
              confirm: {
                label: 'Delete'
              }
            }
          });
          confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
              this._countryService.DeleteRegion(Id).subscribe((data) => {
                if (data.success == true) {
                  const index = this.regionsList.findIndex(a => a.regionId == Id);
                  if (index >= 0) {
                    this.regionsList.splice(index, 1);
                    this.dataSource = new MatTableDataSource(this.regionsList);
                  }
                }
              })
            }
          }); 
    }

    cancel(){
        this.isRegionSelected = false;
        this.selectedRegion = null;
        this.regionId = "";
        this.regionForm.setValue({name: null });  
    }

    onRowClick(event: any, rowData: any) { 
        if (!(event.srcElement instanceof SVGElement)) {
          this.isRegionSelected =  true;//!this.visible;
          if (rowData) {
            this.selectedRegion = rowData;

            this.regionId = this.selectedRegion.regionId;
            this.regionForm.setValue({name: this.selectedRegion.name });  
          }
        }
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