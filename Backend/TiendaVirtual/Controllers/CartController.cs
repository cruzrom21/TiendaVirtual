using Microsoft.AspNetCore.Mvc;
using TiendaVirtualBLL;
using TiendaVirtualDAL.DbModels;
using TiendaVirtualDAL.Models;

namespace TiendaVirtual.Controllers
{
	[ApiController]
	public class CartController : Controller
	{
		private readonly TiendaVirtualContext _context;
		public CartController(TiendaVirtualContext _context)
		{
			this._context = _context;
		}

		[HttpGet]
		[Route("api/cart/init")]
		public string PostInitCart()
		{
			CartBLL cart = new CartBLL(_context);
			string response = cart.InitCart();

			return response;
		}

		[HttpPost]
		[Route("api/cart/add")]
		public string PostAddCart(Cart resquest)
		{
			CartBLL cart = new CartBLL(_context);
			string response = cart.AddCart(resquest);

			return response;
		}

		[HttpPost]
		[Route("api/cart/edit")]
		public string PostEditCart(Cart resquest)
		{
			CartBLL cart = new CartBLL(_context);
			string response = cart.EditCart(resquest);

			return response;
		}

		[HttpPost]
		[Route("api/cart/del")]
		public string PostDelCart(Cart resquest)
		{
			CartBLL cart = new CartBLL(_context);
			string response = cart.DelCart(resquest);

			return response;
		}

		[HttpPost]
		[Route("api/cart/clear")]
		public string PostClearCart()
		{
			CartBLL cart = new CartBLL(_context);
			string response = cart.ClearCart();

			return response;
		}
	}
}
