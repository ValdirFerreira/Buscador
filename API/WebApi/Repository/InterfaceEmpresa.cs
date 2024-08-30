using WebApi.Entities;

namespace WebApi.Repository
{
    public interface InterfaceEmpresa
    {
        Task Add(EmpresaModel Objeto);
        Task Update(EmpresaModel Objeto);
        Task Delete(EmpresaModel Objeto);
        Task<EmpresaModel> GetEntityById(int Id);
        Task<List<EmpresaModel>> List();

        Task<List<EmpresaModel>> ListLike(string search);
    }
}
