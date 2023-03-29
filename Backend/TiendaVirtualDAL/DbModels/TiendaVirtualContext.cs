using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TiendaVirtualDAL.DbModels;

public partial class TiendaVirtualContext : DbContext
{
	//public TiendaVirtualContext()
	//{
	//}

	public TiendaVirtualContext(DbContextOptions<TiendaVirtualContext> options)
		: base(options)
	{
	}

	public virtual DbSet<Buy> Buys { get; set; }

	public virtual DbSet<Cart> Carts { get; set; }

	//protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	//	=> optionsBuilder.UseSqlServer("server=DESKTOP-RB5KS42\\SQLEXPRESS; database=TiendaVirtual; integrated security=true; Encrypt=False");

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Buy>(entity =>
		{
			entity.ToTable("Buy");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Amount).HasColumnName("amount");
			entity.Property(e => e.Bank)
				.HasMaxLength(50)
				.IsUnicode(false)
				.HasColumnName("bank");
			entity.Property(e => e.Name)
				.HasMaxLength(100)
				.IsUnicode(false)
				.HasColumnName("name");
			entity.Property(e => e.Phone)
				.HasMaxLength(20)
				.IsUnicode(false)
				.HasColumnName("phone");
			entity.Property(e => e.Product)
				.HasMaxLength(200)
				.IsUnicode(false)
				.HasColumnName("product");
			entity.Property(e => e.ProductId)
				.HasMaxLength(20)
				.IsUnicode(false)
				.HasColumnName("productId");
			entity.Property(e => e.Total).HasColumnName("total");
		});

		modelBuilder.Entity<Cart>(entity =>
		{
			entity.ToTable("Cart");

			entity.Property(e => e.IdCart).HasColumnName("idCart");
			entity.Property(e => e.Count).HasColumnName("count");
			entity.Property(e => e.Identification)
				.HasMaxLength(20)
				.IsUnicode(false)
				.HasColumnName("identification");
			entity.Property(e => e.Price).HasColumnName("price");
			entity.Property(e => e.Stock).HasColumnName("stock");
			entity.Property(e => e.Thumbnail)
				.HasMaxLength(250)
				.IsUnicode(false)
				.HasColumnName("thumbnail");
			entity.Property(e => e.Title)
				.HasMaxLength(150)
				.IsUnicode(false)
				.HasColumnName("title");
			entity.Property(e => e.Ip)
				.HasMaxLength(50)
				.IsUnicode(false)
				.HasColumnName("ip");
		});

		OnModelCreatingPartial(modelBuilder);
	}

	partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
