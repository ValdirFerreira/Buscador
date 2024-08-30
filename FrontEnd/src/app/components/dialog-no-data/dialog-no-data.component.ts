import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PesquisaRequest, PesquisaResult } from 'src/app/models/PesquisaResultModel/PesquisaResult';
import { RowTable, TableDataInfo } from 'src/app/models/TableDataInfo/TableDataInfo';
import { Session } from 'src/app/pages/home/guards/session';
import { PesquisaService } from 'src/app/services/pesquisa.service';

@Component({
  selector: 'dialog-no-data',
  templateUrl: './dialog-no-data.component.html',
  styleUrls: ['./dialog-no-data.component.scss'],
})
export class DialogNoDataComponent implements OnInit {


  constructor(

    private dialogRef: MatDialogRef<DialogNoDataComponent>,
    private session: Session,
    public dialog: MatDialog,
    private pesquisaService: PesquisaService
  ) { }



  ngOnInit(): void {
    setTimeout(() => this.closeDialog(), 4000)
  }


  closeDialog() {
    //Write your stuff here
    this.dialogRef.close(); // <- Closes the dialog
  }




}
