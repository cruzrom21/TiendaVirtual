using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TiendaVirtualDAL.DbModels;

public partial class Cart
{
	[Key]
    public int IdCart { get; set; }

    public string Identification { get; set; } = null!;

    public string Thumbnail { get; set; } = null!;

    public string Title { get; set; } = null!;

    public double Price { get; set; }

    public int Count { get; set; }

    public int Stock { get; set; }
    public string Ip { get; set; } = null!;
}
