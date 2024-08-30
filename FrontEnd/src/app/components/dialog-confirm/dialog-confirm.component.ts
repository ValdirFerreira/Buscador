import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PesquisaRequest, PesquisaResult } from 'src/app/models/PesquisaResultModel/PesquisaResult';
import { RowTable, TableDataInfo } from 'src/app/models/TableDataInfo/TableDataInfo';
import { Session } from 'src/app/pages/home/guards/session';
import { PesquisaService } from 'src/app/services/pesquisa.service';

@Component({
  selector: 'dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent implements OnInit {


  constructor(

    private dialogRef: MatDialogRef<DialogConfirmComponent>,
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
