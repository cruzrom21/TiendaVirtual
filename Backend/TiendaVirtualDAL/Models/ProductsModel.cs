using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaVirtual.Models;

namespace TiendaVirtualDAL.Models
{
	public class ProductsModel
	{
		public int id { get; set; }
		public string title { get; set; }
		public double price { get; set; }
		public string description { get; set; }
		public string category { get; set; }
		public double? discountPercentage { get; set; }
		public double rating { get; set; }
		public int? stock { get; set; }
		public string? brand { get; set; }
		public string? thumbnail { get; set; }
		public List<string> images { get; set; }
		public string identification { get; set; }
		public string type { get; set; }
		public int count { get; set; }

	}
}
