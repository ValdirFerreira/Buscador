using Microsoft.EntityFrameworkCore;
using WebApi.Config;
using WebApi.Entities;

namespace WebApi.Repository
{
    public class RepositoryEmpresa : InterfaceEmpresa
    {

        private readonly DbContextOptions<ContextBase> _OptionsBuilder;

        public RepositoryEmpresa()
        {
            _OptionsBuilder = new DbContextOptions<ContextBase>();
        }


        public async Task Add(EmpresaModel Objeto)
        {
            using (var data = new ContextBase(_OptionsBuilder))
            {
                await data.Set<EmpresaModel>().AddAsync(Objeto);
                await data.SaveChangesAsync();
            }
        }

        public async Task Delete(EmpresaModel Objeto)
        {
            using (var data = new ContextBase(_OptionsBuilder))
            {
                data.Set<EmpresaModel>().Remove(Objeto);
                await data.SaveChangesAsync();
            }
        }

        public async Task<EmpresaModel> GetEntityById(int Id)
        {
            using (var data = new ContextBase(_OptionsBuilder))
            {
                return await data.Set<EmpresaModel>().FindAsync(Id);
            }
        }

        public async Task<List<EmpresaModel>> List()
        {
            using (var data = new ContextBase(_OptionsBuilder))
            {
                return await data.Set<EmpresaModel>().ToListAsync();
            }
        }

        public async Task Update(EmpresaModel Objeto)
        {
            using (var data = new ContextBase(_OptionsBuilder))
            {
                data.Set<EmpresaModel>().Update(Objeto);
                await data.SaveChangesAsync();
            }
        }
    }
}
