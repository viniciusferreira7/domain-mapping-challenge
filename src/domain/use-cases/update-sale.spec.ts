import { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id'
import { Product } from '../entities/product'
import { Sale } from '../entities/sale'
import { Status } from '../entities/value-object/status'
import { InvalidSale } from '../error/invalid-sale'
import { ResourceNotFound } from '../error/resource-not-found'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { InMemorySalesRepository } from '../repositories/in-memory/in-memory-sales-repository'
import { UpdateSale } from './update-sale'


let products: Product[] = []

let sales: Sale[] = []

let salesRepository: InMemorySalesRepository
let productsRepository: InMemoryProductsRepository

let sut: UpdateSale

describe('Create sale', () => {
  beforeEach(() => {
     products = [
        Product.create({
          id: new UniqueEntityId("1"),
          name: "T-Shirt",
          size: "M",
          color: "Blue",
          amount: 15,
          prize: 7500,
          min_amount: 10,
        }),
      ]

    sales.push(Sale.create({
      id: new UniqueEntityId("1"),
      name: "sale-1",
      amount: 10,
      profit: products[0].prize * 10,
      productId: "1",
      customerId: "customer-1",
      status: new Status("pending"),
    }))

    salesRepository = new InMemorySalesRepository(sales, products)
    productsRepository = new InMemoryProductsRepository(products)
    sut = new UpdateSale(salesRepository, productsRepository)
  })

  it('should be able to update a sale', async () => {
    const { sale } = await sut.execute({
     saleId: '1',
     fields: {
      name: "sale-2",
      amount: 10,
      productId: "1",
      customerId: "customer-1",
      status: 'processing',
     }
    })

    expect(sale).toEqual(expect.objectContaining(
      {
        props: expect.objectContaining({
          name: 'sale-2',
          productId: "1",
          customerId: "customer-1",
          status: new Status('processing'),
          profit: expect.any(Number),
          amount: 10,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      },
    ))
  })

  it('should not able to update a sale with non-existent sale', async ()=> {
    await expect(() =>  sut.execute({
      saleId: 'non-existent-sale',
      fields: {
      name: "sale-98",
      amount: 10,
      productId: "non-existent-product",
      customerId: "customer-1",
      }
    })).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not able to update a sale has amount more than in stock', async ()=> {
    await expect(() =>  sut.execute({
     saleId: '1',
     fields: {
      name: "sale-1",
      amount: 16,
      productId: "1",
      customerId: "customer-1",
     }
    })).rejects.toBeInstanceOf(InvalidSale)
  })
  
})