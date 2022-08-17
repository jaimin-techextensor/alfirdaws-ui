import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from './pipes/search-filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SearchFilterPipe,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations :
    [
        SearchFilterPipe
    ]
})
export class SharedModule
{
}
