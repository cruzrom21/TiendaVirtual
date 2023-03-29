using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net;
using System.Net.Sockets;
using TiendaVirtualDAL.DbModels;
using TiendaVirtualDAL.Models;

namespace TiendaVirtualBLL
{
	public class CartBLL
	{
		private readonly TiendaVirtualContext _context;
		public CartBLL(TiendaVirtualContext _context)
		{
			this._context = _context;
		}

		public string InitCart()
		{
			try
			{
				List<Cart> cart = _context.Carts.Where(x => x.Ip == GetIp()).ToList();

				List<ProductsModel> listProduct = cart
					.Select(a => new ProductsModel
					{
						id = a.IdCart,
						title = a.Title,
						price = a.Price,
						description = "",
						category = "",
						discountPercentage = null,
						rating = 0,
						stock = a.Stock,
						brand = null,
						thumbnail = a.Thumbnail,
						images = new List<string>(),
						identification = a.Identification,
						type = a.Identification,
						count = a.Count
					}).ToList();

				string JsonString = JsonConvert.SerializeObject(new
				{
					products = listProduct,
					status = "success"
				});

				return JsonString;
			}
			catch (Exception ex)
			{
				string JsonString = JsonConvert.SerializeObject(new
				{
					status = "Ocurrio un problema al guardar el carrito" + ex.Message
				});

				return JsonString;
			}
		}

		public string AddCart(Cart cart)
		{
			try
			{
				cart.Ip = GetIp();

				_context.Carts.Add(cart);
				_context.SaveChanges();

				string JsonString = JsonConvert.SerializeObject(new
				{
					status = "success"
				});

				return JsonString;
			}
			catch (Exception ex)
			{
				string JsonString = JsonConvert.SerializeObject(new
				{
					status = "Ocurrio un problema al guardar el carrito" + ex.Message
				});

				return JsonString;
			}
		}

		public string EditCart(Cart cart)
		{
			try
			{
				Cart cartEdit = _context.Carts.Where(x => x.Identification == cart.Identification && x.Ip == GetIp()).FirstOrDefault();
				cartEdit.Count = cart.Count;

				_context.SaveChanges();

				string JsonString = JsonConvert.SerializeObject(new
				{
					status = "success"
				});

				return JsonString;
			}
			catch (Exception ex)
			{
				string JsonString = JsonConvert.SerializeObject(new
				{
					status = "Ocurrio un problema al guardar el carrito" + ex.Message
				});

				return JsonString;
			}
		}


		public string DelCart(Cart cart)
		{
			try
			{
				Cart cartRemove = _context.Carts.Where(x => x.Identification == cart.Identification && x.Ip == GetIp()).FirstOrDefault();

				if (cartRemove != null)
				{
					_context.Carts.Remove(cartRemove);
					_context.SaveChanges();
				}

				string JsonString = JsonConvert.SerializeObject(new
				{
					status = "success"
				});

				return JsonString;
			}
			catch (Exception ex)
			{
				string JsonString = JsonConvert.SerializeObject(new
				{
					status = "Ocurrio un problema al eliminar del carrito" + ex.Message
				});

				return JsonString;
			}
		}


		public string ClearCart()
		{
			try
			{
				List<Cart> cart = _context.Carts.Where(x => x.Ip == GetIp()).ToList();

				if (cart != null)
				{
					_context.Carts.RemoveRange(cart);
					_context.SaveChanges();
				}

				string JsonString = JsonConvert.SerializeObject(new
				{
					status = "success"
				});

				return JsonString;
			}
			catch (Exception ex)
			{
				string JsonString = JsonConvert.SerializeObject(new
				{
					status = "Ocurrio un problema al guardar el carrito" + ex.Message
				});

				return JsonString;
			}
		}

		public string GetIp()
		{
			try
			{
				IPHostEntry host = Dns.GetHostEntry(Dns.GetHostName());
				IPAddress ippaddress = host.AddressList.FirstOrDefault(ip => ip.AddressFamily == AddressFamily.InterNetwork);

				return ippaddress.ToString();
			}
			catch (Exception ex)
			{
				return "SinIP";
			}
		}



	}
}
