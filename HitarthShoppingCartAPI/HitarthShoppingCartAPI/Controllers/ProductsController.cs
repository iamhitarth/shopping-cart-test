using System.Collections.Generic;
using HitarthShoppingCartAPI.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace HitarthShoppingCartAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProductsController : ControllerBase
  {
    List<ProductDto> _products = new List<ProductDto> {
        new ProductDto{
          Id = "1",
          Name = "Coffee",
          Price = 15.50m
        },
        new ProductDto {
          Id = "2",
          Name = "Milk",
          Price = 17.50m
        },
        new ProductDto {
          Id = "3",
          Name = "Sugar",
          Price = 14
        },
        new ProductDto {
          Id = "4",
          Name = "Cookie",
          Price = 17
        },
        new ProductDto {
          Id = "5",
          Name = "Chocolate",
          Price = 12.50m
        }
      };

    // GET api/products
    [HttpGet]
    public ActionResult<IEnumerable<ProductDto>> Get()
    {
      return _products;
    }

    // POST api/products
    [HttpPost]
    public void Post([FromBody] List<ProductDto> products)
    {
    }

    // POST api/products/getShippingCost
    [HttpPost("getShippingCost")]
    public decimal GetShippingCost([FromBody] List<string> productIds)
    {
      decimal totalProductsCost = 0;

      productIds.ForEach(productId =>
      {
        var currentProduct = _products.Find(product => product.Id == productId);
        totalProductsCost = totalProductsCost + currentProduct.Price;
      });

      return totalProductsCost < 50 ? 10 : 20;
    }
  }
}
