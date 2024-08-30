using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    [AllowAnonymous]
    public class EmpresasController : ControllerBase
    {
        private readonly InterfaceEmpresa _InterfaceEmpresa;

        public EmpresasController(InterfaceEmpresa InterfaceEmpresa)
        {
            _InterfaceEmpresa = InterfaceEmpresa;
        }

        [HttpGet("/api/ListEmpresa")]
        [Produces("application/json")]
        public async Task<object> ListEmpresa()
        {
            return await _InterfaceEmpresa.List();
        }

        [HttpPost("/api/AddEmpresa")]
        [Produces("application/json")]
        public async Task<object> AddEmpresa(EmpresaModel product)
        {
            try
            {
                await _InterfaceEmpresa.Add(product);
            }
            catch (Exception ERRO)
            {

            }

            return Task.FromResult("OK");
        }

        [HttpPut("/api/UpdateEmpresa")]
        [Produces("application/json")]
        public async Task<object> UpdateEmpresa(EmpresaModel product)
        {
            try
            {
                await _InterfaceEmpresa.Update(product);
            }
            catch (Exception ERRO)
            {

            }

            return Task.FromResult("OK");
        }


        [HttpGet("/api/GetEntityByIdEmpresa")]
        [Produces("application/json")]
        public async Task<object> GetEntityByIdEmpresa(int id)
        {
            return await _InterfaceEmpresa.GetEntityById(id);
        }

        [HttpDelete("/api/DeleteEmpresa")]
        [Produces("application/json")]
        public async Task<object> DeleteEmpresa(int id)
        {
            try
            {
                var product = await _InterfaceEmpresa.GetEntityById(id);

                await _InterfaceEmpresa.Delete(product);

            }
            catch (Exception ERRO)
            {
                return false;
            }

            return true;

        }

    }
}
