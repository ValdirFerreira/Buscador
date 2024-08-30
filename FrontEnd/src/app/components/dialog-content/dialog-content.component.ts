import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmpresaModel } from 'src/app/models/EmpresaModel/EmpresaModel';
import { PesquisaRequest, PesquisaResult } from 'src/app/models/PesquisaResultModel/PesquisaResult';
import { RowTable, TableDataInfo } from 'src/app/models/TableDataInfo/TableDataInfo';
import { Session } from 'src/app/pages/home/guards/session';
import { PesquisaService } from 'src/app/services/pesquisa.service';

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit {
  dialogType: number = 2;
  textPesquisa: string = "";
  tabela: Array<RowTable>;
  itemDetails: EmpresaModel;

  constructor(

    private dialogRef: MatDialogRef<DialogContentComponent>,
    private session: Session,
    public dialog: MatDialog,
    private pesquisaService: PesquisaService
  ) { }


  countLine: number = 1;
  page: number = 1;
  config: any;
  itemsPorPagina = 1;
  openDetails: boolean = false;

  id: string;
  ngOnInit(): void {

    this.id = this.gerarIdParaConfigDePaginacao();
    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina
    };

  //  this.carregaLista();\\

  //this.carregaListaPesquisaMOCK();

  }


  carregaListaPesquisaMOCK() {
    if (this.textPesquisa) {
      let item = new PesquisaRequest();
      item.ParamCampoPesquisa = this.textPesquisa;
  
      let response  =  [
        {
          Id: 1,
          Razao: "Empresa A Ltda",
          Name: "Empresa A",
          Descricao: "Empresa A é uma líder no setor de tecnologia.",
          Observacao: "Nenhuma observação",
          Endereco: "Rua das Flores, 123, São Paulo, SP",
          CNPJ_CPF: "12.345.678/0001-90",
          TipoPessoa: 1 // 1 para Pessoa Jurídica
        },
        {
          Id: 2,
          Razao: "Empresa B S.A.",
          Name: "Empresa B",
          Descricao: "Empresa B atua no ramo de construção civil.",
          Observacao: "Possui filiais em todo o país.",
          Endereco: "Avenida Brasil, 456, Rio de Janeiro, RJ",
          CNPJ_CPF: "23.456.789/0001-01",
          TipoPessoa: 1 // 1 para Pessoa Jurídica
        },
        {
          Id: 3,
          Razao: "João da Silva",
          Name: "João Silva Consultoria",
          Descricao: "Consultoria em gestão de negócios.",
          Observacao: "Atende pequenas e médias empresas.",
          Endereco: "Rua das Palmeiras, 789, Salvador, BA",
          CNPJ_CPF: "123.456.789-00",
          TipoPessoa: 0 // 0 para Pessoa Física
        }
      ]  as EmpresaModel[];
          if (response && response.length > 0) {

            const SimulandoDadosBanco: EmpresaModel[] = [];
            const rows: RowTable[] = [];

            response.forEach(pesquisaResult => {
              SimulandoDadosBanco.push(pesquisaResult);
            });

            var cont = 1;
            var listtablePage = [];
            SimulandoDadosBanco.forEach(x => {


              if (cont <= 4) {
                listtablePage.push(x);
                cont++;
              }
              else {

                var itemTable = new RowTable();
                itemTable.tableData = listtablePage;
                rows.push(itemTable);

                listtablePage = [];
                cont = 1;
              }

            })

            this.tabela = rows;

           
          }
          else {
          
            this.textPesquisa = "";
          }

       

    }
  }

  // carregaLista() {
  //   let item = new PesquisaRequest();
  //   item.ParamCampoPesquisa = this.textPesquisa;
  //   this.pesquisaService.ListPesquisa(item)
  //     .subscribe((response: PesquisaResult[]) => {

  //       if (response && response.length > 0) {
  
  //         const SimulandoDadosBanco: PesquisaResult[] = [];
  //         const rows: RowTable[] = [];
  
  //         response.forEach(pesquisaResult => {          
  //           SimulandoDadosBanco.push(pesquisaResult);
  //         });
  
  //         var cont = 1;
  //         var listtablePage = [];
  //         SimulandoDadosBanco.forEach(x => {
      
      
  //           if (cont <= 4) {
  //             listtablePage.push(x);
  //             cont++;
  //           }
  //           else {
      
  //             var itemTable = new RowTable();
  //             itemTable.tableData = listtablePage;
  //             rows.push(itemTable);
      
  //             listtablePage = [];
  //             cont = 1;
  //           }
      
  //         })

         
      
  //         this.tabela = rows;
  //       }
  //       else{
  //         this.closeDialog();
  //       }
  //     },
  //     error => console.error(error));
  // }


  openFormDetails(item: EmpresaModel) {
    this.itemDetails = item;
    this.openDetails = true;
  }

  returnTable() {
    this.openDetails = false;
  }


  ngOnChanges() {
    this.page = 1;
    if (this.config) {
      this.config.currentPage = this.page;
    }
  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }

  public mudarItemsPorPage() {
    this.page = 1
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }


  onInputFocus(event: any) {
    event.target.removeAttribute('readonly');
  }

  openNewTab(url: string) {
    debugger
    if(url)
    window.open(url, '_blank');
  }

  closeDialog() {
    //Write your stuff here
    this.dialogRef.close(); // <- Closes the dialog
  }


  openWhatsApp(phoneNumber: string) {
    const message = encodeURIComponent("Quero saber mais");
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(url, '_blank');
  }


}
