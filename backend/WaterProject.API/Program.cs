using Microsoft.EntityFrameworkCore;
using WaterProject.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Use BooksDbContext with environment-based database switching
builder.Services.AddDbContext<BooksDbContext>(options =>
{
    var env = builder.Environment.EnvironmentName;
    var config = builder.Configuration;

    if (env == "Development")
    {
        // Use SQLite for local development
        options.UseSqlite(config.GetConnectionString("DevConnection"));
    }
    else
    {
        // Use Azure SQL Server for production
        options.UseSqlServer(config.GetConnectionString("AzureConnection"));
    }
});

builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactAppBlah",
    policy => {
        policy.WithOrigins("http://localhost:3000", "https://yellow-pebble-08b19f41e.6.azurestaticapps.net")
            .AllowAnyMethod()
            .AllowAnyHeader();
    }));

var app = builder.Build();

app.UseCors("AllowReactAppBlah");

// ✅ Optional: Log the current environment for debugging
app.Logger.LogInformation("Running in environment: {env}", app.Environment.EnvironmentName);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
