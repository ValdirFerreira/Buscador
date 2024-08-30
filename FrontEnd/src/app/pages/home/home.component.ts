import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AcoordionModel } from 'src/app/models/AcoordionModel/AcoordionModel';
import { DialogContentComponent } from 'src/app/components/dialog-content/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { FaqService } from 'src/app/services/faq.service';
import { FaqPortal } from 'src/app/models/FaqPortalModel/FaqPortal';
import { PesquisaService } from 'src/app/services/pesquisa.service';
import { SolicitudCotizacion } from 'src/app/models/SolicitudCotizacionModel/SolicitudCotizacion';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { PesquisaRequest, PesquisaResult } from 'src/app/models/PesquisaResultModel/PesquisaResult';
import { RowTable } from 'src/app/models/TableDataInfo/TableDataInfo';
import { DialogNoDataComponent } from 'src/app/components/dialog-no-data/dialog-no-data.component';
import { DialogContentComponentPlano } from 'src/app/components/dialog-content-plano/dialog-content-plano.component';
import { EmpresaModel } from 'src/app/models/EmpresaModel/EmpresaModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  textPesquisa: string = "";
  textPesquisaValid: boolean = true;

  constructor(
    public dialog: MatDialog,
    private translate: TranslateService,
    public faqService: FaqService,
    public pesquisaService: PesquisaService
  ) {


  }

  ngOnInit(): void {

  }



  openPopup() {
    this.carregaListaPesquisaMOCK();
  }

  openDialog(dialogType: number) {
    if (this.textPesquisa) {
      this.textPesquisaValid = true;
      // reference https://material.angular.io/components/dialog/examples    
      const dialogRef = this.dialog.open(DialogContentComponent);
      dialogRef.componentInstance.dialogType = dialogType;
      dialogRef.componentInstance.textPesquisa = this.textPesquisa;
      dialogRef.componentInstance.tabela = this.tabela;
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.textPesquisa = "";
      });
      //  const dialogRef = this.dialog.open(SearchDialogComponent, { disableClose: true });
    }
    else {
      this.textPesquisaValid = false;
    }
  }

  openDialogConfirm() {

    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaService.cadastroEmpresa = false;
      console.log(`Dialog result: ${result}`);
    });
    //  const dialogRef = this.dialog.open(SearchDialogComponent, { disableClose: true });

  }

  empresaModel =  new EmpresaModel();
  validName: boolean = false;
  validDescricao: boolean = false;
  validRazao: boolean = false;
  validTelefone: boolean = false;
  validCidade: Boolean = false;
  validEndereco: boolean = false;
  validObservacao: boolean = false;

  sendData() {


    if (!this.empresaModel.Name) {
      this.validName = true;
    }
    else {
      this.validName = false;
    }

    if (!this.empresaModel.Descricao) {
      this.validDescricao = true;
    }
    else {
      this.validDescricao = false;
    }

    if (!this.empresaModel.Razao) {
      this.validRazao = true;
    }
    else {
      this.validRazao = false;
    }

    if (!this.empresaModel.Telefone) {
      this.validTelefone = true;
    }
    else {
      this.validTelefone = false;
    }

    if (!this.empresaModel.Cidade) {
      this.validCidade = true;
    }
    else {
      this.validCidade = false;
    }

    if (!this.empresaModel.Endereco) {
      this.validEndereco = true;
    }
    else {
      this.validEndereco = false;
    }

    if (!this.empresaModel.Observacao) {
      this.validObservacao = true;
    }
    else {
      this.validObservacao = false;
    }

    // this.openDialogConfirm();    

    // this.pesquisaService.addEmpresa(this.empresaModel)
    //   .subscribe((response: any) => {
    //     if (response) {
    //      this.empresaModel = new  EmpresaModel();
    //       this.openDialogConfirm();
    //     }
    //   },
    //     error => console.error(error));
  }

  // Função para validar o formato do e-mail
  validateEmail(email: string) {
    // Regex simples para validar o formato de e-mail
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


  tabela: Array<RowTable>;
  carregaListaPesquisa() {
    if (this.textPesquisa) {
      let item = new PesquisaRequest();
      item.ParamCampoPesquisa = this.textPesquisa;
      this.pesquisaService.ListPesquisa(item)
        .subscribe((response: EmpresaModel[]) => {

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

            this.openDialog(1);
          }
          else {
            this.openDialogNoData();
            this.textPesquisa = "";
          }

        },
          error => console.error(error));

    }
  }

  carregaListaPesquisaMOCK() {
    if (this.textPesquisa) {
      let item = new PesquisaRequest();
      item.ParamCampoPesquisa = this.textPesquisa;

      let response = [
        {
          Id: 1,
          Razao: "Alpha Tech Ltda",
          Name: "Alpha Tech",
          Descricao: "Empresa de software especializada em soluções empresariais.",
          Observacao: "Referência no mercado de ERP.",
          Endereco: "Rua das Estrelas, 100",
          Telefone: "(31) 1234-5678",
          Cidade: "Belo Horizonte",
          CNPJ_CPF: "12.345.678/0001-99",
          TipoPessoa: 1 // Pessoa Jurídica
        },
        {
          Id: 2,
          Razao: "Beta Construtora S.A.",
          Name: "Beta Construtora",
          Descricao: "Atua no setor de construção civil, com projetos residenciais e comerciais.",
          Observacao: "Projeto de expansão para o interior do estado.",
          Endereco: "Avenida Central, 2000",
          Telefone: "(19) 2345-6789",
          Cidade: "Campinas",
          CNPJ_CPF: "23.456.789/0001-10",
          TipoPessoa: 1 // Pessoa Jurídica
        },
        {
          Id: 3,
          Razao: "Gamma Comércio de Alimentos ME",
          Name: "Gamma Alimentos",
          Descricao: "Comércio de produtos alimentícios orgânicos.",
          Observacao: "Premiada como melhor empresa do setor em 2023.",
          Endereco: "Rua das Palmeiras, 300",
          Telefone: "(41) 3456-7890",
          Cidade: "Curitiba",
          CNPJ_CPF: "34.567.890/0001-22",
          TipoPessoa: 1 // Pessoa Jurídica
        },
        {
          Id: 4,
          Razao: "Delta Serviços Ltda",
          Name: "Delta Serviços",
          Descricao: "Prestação de serviços de limpeza e conservação.",
          Observacao: "Atende grandes empresas.",
          Endereco: "Rua das Flores, 400",
          Telefone: "(51) 4567-8901",
          Cidade: "Porto Alegre",
          CNPJ_CPF: "45.678.901/0001-33",
          TipoPessoa: 1 // Pessoa Jurídica
        },
        {
          Id: 5,
          Razao: "Epsilon Consultoria Empresarial",
          Name: "Epsilon Consultoria",
          Descricao: "Consultoria em gestão de negócios.",
          Observacao: "Especializada em pequenas e médias empresas.",
          Endereco: "Avenida das Américas, 500",
          Telefone: "(81) 5678-9012",
          Cidade: "Recife",
          CNPJ_CPF: "56.789.012/0001-44",
          TipoPessoa: 1 // Pessoa Jurídica
        },
        {
          Id: 6,
          Razao: "Zeta Comércio Varejista",
          Name: "Zeta Varejo",
          Descricao: "Loja de roupas e acessórios.",
          Observacao: "Loja principal em São Paulo.",
          Endereco: "Rua 25 de Março, 600",
          Telefone: "(11) 6789-0123",
          Cidade: "São Paulo",
          CNPJ_CPF: "67.890.123/0001-55",
          TipoPessoa: 1 // Pessoa Jurídica
        },
        {
          Id: 7,
          Razao: "Theta Educação e Treinamento",
          Name: "Theta Treinamentos",
          Descricao: "Cursos e treinamentos corporativos.",
          Observacao: "Parcerias com grandes universidades.",
          Endereco: "Rua dos Professores, 700",
          Telefone: "(21) 7890-1234",
          Cidade: "Rio de Janeiro",
          CNPJ_CPF: "78.901.234/0001-66",
          TipoPessoa: 1 // Pessoa Jurídica
        },
        {
          Id: 8,
          Razao: "Iota Transportes Ltda",
          Name: "Iota Transportes",
          Descricao: "Empresa de transporte e logística.",
          Observacao: "Opera em todo o território nacional.",
          Endereco: "Avenida do Transporte, 800",
          Telefone: "(85) 8901-2345",
          Cidade: "Fortaleza",
          CNPJ_CPF: "89.012.345/0001-77",
          TipoPessoa: 1 // Pessoa Jurídica
        },
        {
          Id: 9,
          Razao: "João Pereira",
          Name: "João Pereira",
          Descricao: "Consultoria individual em finanças pessoais.",
          Observacao: "Especialista em planejamento financeiro.",
          Endereco: "Rua dos Economistas, 900",
          Telefone: "(61) 9012-3456",
          Cidade: "Brasília",
          CNPJ_CPF: "123.456.789-00",
          TipoPessoa: 0 // Pessoa Física
        },
        {
          Id: 10,
          Razao: "Maria Silva",
          Name: "Maria Silva Doces",
          Descricao: "Venda de doces artesanais.",
          Observacao: "Atende pedidos para eventos.",
          Endereco: "Rua das Confeitarias, 1000",
          Telefone: "(71) 0123-4567",
          Cidade: "Salvador",
          CNPJ_CPF: "234.567.890-11",
          TipoPessoa: 0 // Pessoa Física
        }
      ] as EmpresaModel[];


      debugger
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

      debugger
      this.tabela = rows;

      this.openDialog(1);




    }
  }


  openDialogNoData() {

    const dialogRef = this.dialog.open(DialogNoDataComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    //  const dialogRef = this.dialog.open(SearchDialogComponent, { disableClose: true });

  }


}


