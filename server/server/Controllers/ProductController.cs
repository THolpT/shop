using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Domain;
using server.Domain.Models;
namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IResult> Create([FromBody] Product productRequest)
        {
            if (productRequest == null || productRequest.Title == null || productRequest.Price == null) return Results.BadRequest();

            _context.Products.Add(productRequest);
            await _context.SaveChangesAsync();

            return Results.Ok();
        }

        [HttpGet]
        public async Task<List<Product>> GetAll()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
