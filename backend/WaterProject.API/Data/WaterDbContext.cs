using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data
{
    public class BooksDbContext : DbContext
    {
        public BooksDbContext(DbContextOptions<BooksDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; } // Books is the name of the table in the database. Book is the name of the class (see project.cs).
    }
}
