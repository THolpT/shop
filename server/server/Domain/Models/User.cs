namespace server.Domain.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Login { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public ICollection<Product> SavedProduct { get; set; } = new List<Product>();
    }
}
