using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRUDPersona.Models;

namespace CRUDPersona.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaController : ControllerBase
    {
        private readonly PersonaContext _contextPersona;

        public PersonaController(PersonaContext context)
        {
            _contextPersona = context;
        }
        [HttpGet]
        [Route("Mostrar")]
        public async Task<IActionResult> Mostrar()
        {
            List<Persona> listaPersonas=_contextPersona.Personas.OrderByDescending(p=>p.Id).ToList();
            return StatusCode(StatusCodes.Status200OK, listaPersonas);
        }
        [HttpPost]
        [Route("Agregar")]
        public async Task<IActionResult> Agregar([FromBody]Persona request)
        {
            await _contextPersona.Personas.AddAsync(request);
            await _contextPersona.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }
        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody]Persona request)
        {
             _contextPersona.Personas.Update(request);
            await _contextPersona.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int? id)
        {
            Persona persona = _contextPersona.Personas.Find(id);
            _contextPersona.Personas.Remove(persona);
            await _contextPersona.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
