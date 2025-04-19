using Microsoft.EntityFrameworkCore;
using WaterProject.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Local-only database setup with SQLite
builder.Services.AddDbContext<EntertainersDBContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("EntertainmentConnection"));
});

// Local CORS policy (React dev server)
builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactAppBlah", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    }));

var app = builder.Build();

app.UseCors("AllowReactAppBlah");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Uncomment the line below if you're using HTTPS locally
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
