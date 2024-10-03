namespace WebApi.Entities
{
    public class EmpresaModel
    {
        public int Id { get; set; }
        /// <summary>
        /// Razao Social
        /// </summary>
        public string Razao { get; set; }

        public string Name { get; set; }

        public string Descricao { get; set; }

        public string Observacao { get; set; }

        public string Endereco { get; set; }

          public string Cidade { get; set; }

        public string Telefone { get; set; }

        public string CNPJ_CPF { get; set; }



        /// <summary>
        /// Pessoa Fisica ou Juridica
        /// </summary>
        public int TipoPessoa { get; set; }


        public DateTime DataCadastro { get; set; }

        public DateTime DataAlteracao { get; set; }


    }
}
