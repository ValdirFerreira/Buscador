export class EmpresaModel {
    Id: number;
  
    /**
     * Razao Social
     */
    Razao: string;
  
    Name: string;
    Descricao: string;
    Observacao: string;
    Endereco: string;
    Telefone: string;
    Cidade:string;
    CNPJ_CPF: string;
  
    /**
     * Pessoa Física ou Jurídica
     */
    TipoPessoa: number;
  }
  