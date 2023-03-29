using Microsoft.AspNetCore.Mvc;
using TiendaVirtualBLL;

namespace TiendaVirtual.Controllers
{
	[ApiController]
	[Route("api/products")]
	public class ProductsController : Controller
	{
		[HttpGet]
		[ActionName("/")]
		public async Task<string> GetProducts()
		{
			MergeApisProducts dummyJsonService = new MergeApisProducts();
			string response = await dummyJsonService.GetProductos();

			return response;
		}

		[HttpGet("{id}", Name = "Get")]
		public async Task<string> GetProducts(string id)
		{
			MergeApisProducts dummyJsonService = new MergeApisProducts();
			string response = await dummyJsonService.GetProductos(id);

			return response;
		}
	}
}
