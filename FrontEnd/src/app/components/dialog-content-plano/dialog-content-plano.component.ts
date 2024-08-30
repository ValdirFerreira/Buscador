import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PesquisaRequest, PesquisaResult } from 'src/app/models/PesquisaResultModel/PesquisaResult';
import { SolicitudCotizacionPlano } from 'src/app/models/SolicitudCotizacionModel/SolicitudCotizacion';
import { RowTable, TableDataInfo } from 'src/app/models/TableDataInfo/TableDataInfo';
import { Session } from 'src/app/pages/home/guards/session';
import { PesquisaService } from 'src/app/services/pesquisa.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'dialog-content-plano',
  templateUrl: './dialog-content-plano.component.html',
  styleUrls: ['./dialog-content-plano.component.scss'],
})
export class DialogContentComponentPlano implements OnInit {
  dialogType: number = 2;
  textPesquisa: string = "";
  tabela: Array<RowTable>;
  itemDetails: PesquisaResult;

  constructor(

    private dialogRef: MatDialogRef<DialogContentComponentPlano>,
    private session: Session,
    public dialog: MatDialog,
    private pesquisaService: PesquisaService,
    public translate: TranslateService,
  ) { }


  countLine: number = 1;
  page: number = 1;
  config: any;
  itemsPorPagina = 1;
  openDetails: boolean = false;

  id: string;
  ngOnInit(): void {
  }


  ngOnChanges() {
  }


  closeDialog() {
    //Write your stuff here
    this.dialogRef.close(); // <- Closes the dialog
  }


  TipoPlano: string;
  ValorPlano: string;
  Nombres: string;
  Telefono: string;
  CorreoElectronico: string;
  Comentario: string;

  validTipoPlano: boolean = false;
  validValor: boolean = false;
  validNombres: boolean = false;
  validTelefono: boolean = false;
  validCorreoElectronico: boolean = false;
  validComentario: boolean = false;


  sendData() {

    // Verificar se o campo Empresa está vazio
    this.validTipoPlano = !this.TipoPlano ? true : false;

    // Verificar se o campo ActividadEconomica está vazio
    this.validValor = !this.ValorPlano ? true : false;

    // Verificar se o campo Nombres está vazio
    this.validNombres = !this.Nombres ? true : false;

    this.validTelefono = !this.Telefono ? true : false;

    // Verificar se o campo CorreoElectronico está vazio e se está em um formato válido
    // if (!this.CorreoElectronico || !this.validateEmail(this.CorreoElectronico)) {
    //     this.validCorreoElectronico = true;
    // } else {
    //     this.validCorreoElectronico = false;
    // }

    if (!this.CorreoElectronico) {
      this.validCorreoElectronico = true;
    } else {
      this.validCorreoElectronico = false;
    }


    if (!this.validTipoPlano &&
      !this.validValor &&
      !this.validNombres &&
      !this.validCorreoElectronico
    ) {

      let solicitud = new SolicitudCotizacionPlano();

      solicitud.TipoPlano = this.TipoPlano;
      solicitud.ValorPlano = this.ValorPlano;
      solicitud.Nombres = this.Nombres;
      solicitud.CorreoElectronico = this.CorreoElectronico;
      solicitud.Comentario = this.Comentario;
      solicitud.Telefono = this.Telefono;

      this.pesquisaService.insertSolicitudCotizacionPlano(solicitud)
        .subscribe((response: any) => {
          if (response) {
            this.TipoPlano = "";
            this.ValorPlano = "";
            this.Nombres = "";
            this.CorreoElectronico = "";
            this.Comentario = "";
            this.Telefono = "";
            this.closeDialog();

            this.openDialogConfirm();
          }
        },
          error => console.error(error));
    }

  }



  openDialogConfirm() {

    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    //  const dialogRef = this.dialog.open(SearchDialogComponent, { disableClose: true });

  }


}
