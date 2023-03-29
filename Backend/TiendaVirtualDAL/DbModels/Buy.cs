using System;
using System.Collections.Generic;

namespace TiendaVirtualDAL.DbModels;

public partial class Buy
{
    public int Id { get; set; }

    public string ProductId { get; set; } = null!;

    public string Product { get; set; } = null!;

    public int Amount { get; set; }

    public string Name { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Bank { get; set; } = null!;

    public double Total { get; set; }
}
