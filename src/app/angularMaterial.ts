import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,        
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatSelectModule,   
        MatTooltipModule, 
        MatRadioModule,   
        MatProgressBarModule, 
        MatProgressSpinnerModule,
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,        
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatSelectModule,  
        MatTooltipModule,      
        MatRadioModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
    ]
})

export class AngularMaterial {} 