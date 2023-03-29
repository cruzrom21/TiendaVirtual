using Microsoft.EntityFrameworkCore;
using TiendaVirtualDAL.DbModels;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<TiendaVirtualContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionDB")));

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
