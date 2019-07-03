using System.Collections.Generic;
using HitarthShoppingCartAPI.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace HitarthShoppingCartAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProductsController : ControllerBase
  {
    // GET api/products
    [HttpGet]
    public ActionResult<IEnumerable<ProductDto>> Get()
    {
      return new ProductDto[] {
        new ProductDto{
          Id = "1",
          Name = "Coffee",
          Price = 5.50m
        },
        new ProductDto {
          Id = "2",
          Name = "Milk",
          Price = 7.50m
        },
        new ProductDto {
          Id = "3",
          Name = "Sugar",
          Price = 4
        },
        new ProductDto {
          Id = "4",
          Name = "Cookie",
          Price = 17
        },
        new ProductDto {
          Id = "5",
          Name = "Chocolate",
          Price = 2.50m
        }
      };
    }

    // POST api/products
    [HttpPost]
    public void Post([FromBody] List<ProductDto> products)
    {
    }
  }
}
