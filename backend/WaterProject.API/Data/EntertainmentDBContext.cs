using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data
{
    public class EntertainersDBContext : DbContext
    {
        public EntertainersDBContext(DbContextOptions<EntertainersDBContext> options) : base(options)
        {
        }

        public DbSet<Entertainer> Entertainers { get; set; } // Entertainers is the name of the table in the database. Entertainer is the name of the class (see project.cs).
        public DbSet<Engagement> Engagements { get; set; } // Engagements is the name of the table in the database. Engagement is the name of the class (see project.cs).
    }
}
