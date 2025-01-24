import { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id'
import { Product } from '../entities/product'
import type { Sale } from '../entities/sale'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { InMemorySalesRepository } from '../repositories/in-memory/in-memory-sales-repository'
import { CreateSale } from './create-sale'
import { create } from 'domain'
import { Status } from '../entities/value-object/status'
import { ResourceNotFound } from '../error/resource-not-found'
import { InvalidSale } from '../error/invalid-sale'


let products: Product[] = []

let sales: Sale[] = []

let salesRepository: InMemorySalesRepository
let productsRepository: InMemoryProductsRepository

let sut: CreateSale

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

    salesRepository = new InMemorySalesRepository(sales, products)
    productsRepository = new InMemoryProductsRepository(products)
    sut = new CreateSale(salesRepository, productsRepository)
  })

  it('should be able to create a sale', async () => {
    const { sale } = await sut.execute({
      name: "sale-1",
      amount: 10,
      productId: "1",
      customerId: "customer-1",
    })

    expect(sale).toEqual(expect.objectContaining(
      {
        props: expect.objectContaining({
          name: 'sale-1',
          productId: "1",
          customerId: "customer-1",
          status: new Status('pending'),
          profit: expect.any(Number),
          amount: 10,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      },
    ))
  })

  it('should not able to create a sale with non-existent product', async ()=> {
    await expect(() =>  sut.execute({
      name: "sale-1",
      amount: 10,
      productId: "non-existent-product",
      customerId: "customer-1",
    })).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not able to create a sale has amount more than in stock', async ()=> {
    await expect(() =>  sut.execute({
      name: "sale-1",
      amount: 16,
      productId: "1",
      customerId: "customer-1",
    })).rejects.toBeInstanceOf(InvalidSale)
  })
})