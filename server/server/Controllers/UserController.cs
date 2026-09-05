using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Domain;
using server.Domain.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IResult> Create([FromBody] User userRequest) {
            if (userRequest == null || userRequest.Login == null || userRequest.Password == null) return Results.BadRequest();

            _context.Users.Add(userRequest);
            await _context.SaveChangesAsync();

            return Results.Ok();
        }

        [HttpPost("login")]
        public async Task<IResult> Login([FromQuery] string login, [FromQuery] string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Login == login);

            if (user == null) return Results.BadRequest();

            if (password != user.Password) return Results.BadRequest();

            return Results.Ok();
        }
    }
}
