using Newtonsoft.Json;
using TiendaVirtual.Models;
using TiendaVirtualDAL.Models;

namespace TiendaVirtual.Services
{
	public class DummyJsonService
	{
		public async Task<List<ProductsModel>> GetProductos()
		{
			try
			{
				DummyJsonModel dataModel = new DummyJsonModel();
				List<ProductsModel> listProduct = new List<ProductsModel>();

				string baseUrl = "https://dummyjson.com/products?limit=100";
				string data = await QueryService(baseUrl);

				if (string.IsNullOrEmpty(data)) return listProduct;

				dataModel = JsonConvert.DeserializeObject<DummyJsonModel>(data)!;

				listProduct = dataModel.products
					.Select(a => new ProductsModel
					{
						id = a.id,
						title = a.title,
						price = a.price,
						description = a.description,
						category = a.category,
						discountPercentage = a.discountPercentage,
						rating = a.rating,
						stock = a.stock,
						brand = a.brand,
						thumbnail = a.thumbnail,
						images = a.images,
						identification = "Dummy-" + a.id,
						type = "dummyjson",
						count = 0
					}).ToList();

				return listProduct;
			}
			catch (Exception ex)
			{
				throw;
			}
		}


		public async Task<ProductsModel?> GetProductos(string id)
		{
			try
			{
				Product dataModel = new Product();
				ProductsModel product = new ProductsModel();

				if (id.Split('-')[0] != "Dummy") return null;

				string baseUrl = "https://dummyjson.com/products/" + id?.Split("-")[1];
				string data = await QueryService(baseUrl);

				if (string.IsNullOrEmpty(data)) return null;

				dataModel = JsonConvert.DeserializeObject<Product>(data);

				product = new ProductsModel
				{
					id = dataModel.id,
					title = dataModel.title,
					price = dataModel.price,
					description = dataModel.description,
					category = dataModel.category,
					discountPercentage = dataModel.discountPercentage,
					rating = dataModel.rating,
					stock = dataModel.stock,
					brand = dataModel.brand,
					thumbnail = dataModel.thumbnail,
					images = dataModel.images,
					identification = "Dummy-" + dataModel.id,
					type = "dummyjson"
				};

				return product;
			}
			catch (Exception ex)
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
