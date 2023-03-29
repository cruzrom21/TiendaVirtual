using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaVirtualDAL.Models
{
	public class BuyModel
	{
		public List<ProductsModel> products { get; set; }
		public string name { get; set; }
		public string phone { get; set; }
		public string bank { get; set; }
		public double total { get; set; }
	}
}
