using Newtonsoft.Json;
using TiendaVirtual.Models;
using TiendaVirtualDAL.Models;

namespace TiendaVirtual.Services
{
	public class FakeStoreApiService
	{
		public async Task<List<ProductsModel>> GetProductos()
		{
			try
			{
				List<FakeStoreApiModel> dataModel = new List<FakeStoreApiModel>();
				List<ProductsModel> listProduct = new List<ProductsModel>();

				string baseUrl = "https://fakestoreapi.com/products";
				string data = await QueryService(baseUrl);

				if (string.IsNullOrEmpty(data)) return listProduct;

				dataModel = JsonConvert.DeserializeObject<List<FakeStoreApiModel>>(data)!;

				listProduct = dataModel
					.Select(a => new ProductsModel
					{
						id = a.id,
						title = a.title,
						price = a.price,
						description = a.description,
						category = a.category,
						discountPercentage = null,
						rating = a.rating.rate,
						stock = null,
						brand = null,
						thumbnail = a.image,
						images = new List<string>() { a.image },
						identification = "Fake-" + a.id,
						type = "fakestoreapi",
						count = 0
					}).ToList();

				return listProduct;
			}
			catch (Exception)
			{
				throw;
			}
		}

		public async Task<ProductsModel?> GetProductos(string id)
		{
			try
			{
				FakeStoreApiModel dataModel = new FakeStoreApiModel();
				ProductsModel product = new ProductsModel();

				if (id.Split('-')[0] != "Fake") return null;

				string baseUrl = "https://fakestoreapi.com/products/" + id?.Split("-")[1];
				string data = await QueryService(baseUrl);

				if (string.IsNullOrEmpty(data)) return null;

				dataModel = JsonConvert.DeserializeObject<FakeStoreApiModel>(data);

				product = new ProductsModel
				{
					id = dataModel.id,
					title = dataModel.title,
					price = dataModel.price,
					description = dataModel.description,
					category = dataModel.category,
					discountPercentage = null,
					rating = dataModel.rating.rate,
					stock = null,
					brand = null,
					thumbnail = dataModel.image,
					images = new List<string>() { dataModel.image },
					identification = "Fake-" + dataModel.id,
					type = "fakestoreapi"
				};

				return product;
			}
			catch (Exception)
			{
				throw;
			}
		}

		public async Task<string> QueryService(string baseUrl)
		{
			try
			{
				string data;

				using (HttpClient client = new HttpClient())
				{
					using (HttpResponseMessage res = await client.GetAsync(baseUrl))
					{
						using (HttpContent content = res.Content)
						{
							data = await content.ReadAsStringAsync();
						}
					}
				}

				return data;
			}
			catch (Exception)
			{
				throw;
			}
		}

	}
}
