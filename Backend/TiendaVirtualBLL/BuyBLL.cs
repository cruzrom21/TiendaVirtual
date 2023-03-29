using Newtonsoft.Json;
using TiendaVirtualDAL.DbModels;
using TiendaVirtualDAL.Models;

namespace TiendaVirtualBLL
{
	public class BuyBLL
	{
		private readonly TiendaVirtualContext _context;
		public BuyBLL(TiendaVirtualContext _context)
		{
			this._context = _context;
		}

		public string SaveBuy(BuyModel buys)
		{
			try
			{
				List<Buy> buyContext = buys.products
					.Select(a => new Buy
					{
						ProductId = a.identification,
						Product = a.title,
						Amount = a.count,
						Name = buys.name,
						Phone = buys.phone,
						Bank = buys.bank,
						Total = buys.total
					}).ToList();

				_context.Buys.AddRange(buyContext);
				_context.SaveChanges();

				string JsonString = JsonConvert.SerializeObject(new
				{
					message = "Compra guardada con exito",
					type = "alert-success"
				});

				return JsonString;
			}
			catch (Exception ex)
			{
				string JsonString = JsonConvert.SerializeObject(new
				{
					message = "Ocurrio un problema al guardar la compra" + ex.Message,
					type = "alert-danger"
				});

				return JsonString;
			}
		}
	}
}
