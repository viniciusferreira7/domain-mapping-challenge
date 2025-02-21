import { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import { Product } from '../entities/product';
import { ResourceNotFound } from '../error/resource-not-found';
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository';
import { LowStockProductUseCase } from './low-stock-product';

const products: Product[] = [
  Product.create({
    id: new UniqueEntityId("1"),
    name: "T-Shirt",
    size: "M",
    color: "Blue",
    amount: 8,
    prize: 7500,
    min_amount: 10,
  }),
  Product.create({
      id: new UniqueEntityId("2"),
      name: "Jeans",
      size: "L",
      color: "Black",
      amount: 30,
      prize: 5500,
      min_amount: 5,
  }),
  Product.create({
    id: new UniqueEntityId("3"),
    name: "Hoodie",
    size: "XL",
    color: "Gray",
    amount: 20,
    prize: 3500,
    min_amount: 8,
  }),
  Product.create({
    id: new UniqueEntityId("3"),
    name: "Sneakers",
    size: "42",
    color: "White",
    amount: 15,
    prize: 6500,
    min_amount: 3,
  }),
];

let inMemoryProductsRepository: InMemoryProductsRepository

let sut: LowStockProductUseCase

describe("Low stock product", () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository(products)
    sut = new LowStockProductUseCase(inMemoryProductsRepository)
  })

  it("should be able to find product with min quantity is greater than amount in stock", async () => {
    const { product } = await sut.execute({ id: new UniqueEntityId("1") })
    expect(product).toEqual(expect.objectContaining(
      {
        props: expect.objectContaining({
          id: expect.any(UniqueEntityId),
          name: "T-Shirt",
          size: "M",
          color: "Blue",
          amount: 8,
          prize: 7500,
          min_amount: 10,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          })
      },
    ))
  })

  it("should not be able to find product with min quantity is smaller than amount in stock", async () => {
    const { product } = await sut.execute({ id: new UniqueEntityId("2") })

    expect(product).toBe(null)

  })
  
  it("should not be able to find product wrong id", async () => {
    
   await expect(() => sut.execute({ id: new UniqueEntityId("wrong-id") })).rejects.toBeInstanceOf(ResourceNotFound)
  })
})