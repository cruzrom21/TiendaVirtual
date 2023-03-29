using Newtonsoft.Json;
using TiendaVirtual.Services;
using TiendaVirtualDAL.Models;

namespace TiendaVirtualBLL
{
	public class MergeApisProducts
	{
		public async Task<string> GetProductos()
		{
			try
			{
				DummyJsonService dummyJsonService = new DummyJsonService();
				List<ProductsModel> dummyProducts = await dummyJsonService.GetProductos();

				FakeStoreApiService fakeStoreApiService = new FakeStoreApiService();
				List<ProductsModel> fakeProducts = await fakeStoreApiService.GetProductos();

				List<ProductsModel> listProducts = dummyProducts.Concat(fakeProducts).OrderBy(x => x.id).OrderBy(x => x.title).ThenByDescending(x => x.price).ToList();

				string JsonString = JsonConvert.SerializeObject(listProducts);

				return JsonString;
			}
			catch (Exception ex)
			{
				return "Error:" + ex;
			}
		}

		public async Task<string> GetProductos(string id)
		{
			try
			{
				DummyJsonService dummyJsonService = new DummyJsonService();
				ProductsModel? dummyProducts = await dummyJsonService.GetProductos(id);

				FakeStoreApiService fakeStoreApiService = new FakeStoreApiService();
				ProductsModel? fakeProducts = await fakeStoreApiService.GetProductos(id);				

				string JsonString = dummyProducts != null ? JsonConvert.SerializeObject(dummyProducts) : JsonConvert.SerializeObject(fakeProducts);

				return JsonString;
			}
			catch (Exception ex)
			{
				return "Error:" + ex;
			}
		}
	}
}