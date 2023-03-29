using Microsoft.AspNetCore.Mvc;
using TiendaVirtualBLL;
using TiendaVirtualDAL.DbModels;
using TiendaVirtualDAL.Models;

namespace TiendaVirtual.Controllers
{
	[ApiController]
	[Route("api/buy")]
	public class BuyController : Controller
	{
		private readonly TiendaVirtualContext _context;
		public BuyController(TiendaVirtualContext _context)
		{
			this._context = _context;
		}

		[HttpPost]
		[ActionName("/")]
		public async Task<string> PostBuy(BuyModel resquest)
		{
			BuyBLL buy = new BuyBLL(_context);
			string response = buy.SaveBuy(resquest);

			return response;
		}
	}
}
