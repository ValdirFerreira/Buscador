import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContentComponentPlano } from './dialog-content-plano.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {Component} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClient } from '@angular/common/http';
import { TraducaoService } from 'src/app/services/traducao-service';



@NgModule({
  declarations: [
    DialogContentComponentPlano,
    
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    BrowserModule,
    NgxPaginationModule,
    NgSelectModule,

  ],
  exports: [
    DialogContentComponentPlano
  ]
})
export class DialogContentPlanoModule { }

