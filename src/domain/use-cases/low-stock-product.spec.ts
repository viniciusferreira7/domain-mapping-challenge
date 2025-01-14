import type { Product } from '../entities/product'
import { ResourceNotFound } from '../error/resource-not-found';
import type { ProductRepository } from '../repositories/product-repository'
import { LowStockProductUseCase } from './low-stock-product';

const products: Product[] = [
  {
    id: "1",
    name: "T-Shirt",
    size: "M",
    color: "Blue",
    amount: 8,
    min_amount: 10,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    name: "Jeans",
    size: "L",
    color: "Black",
    amount: 30,
    min_amount: 5,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "3",
    name: "Hoodie",
    size: "XL",
    color: "Gray",
    amount: 20,
    min_amount: 8,
    created_at: new Date(),
  },
  {
    id: "4",
    name: "Sneakers",
    size: "42",
    color: "White",
    amount: 15,
    min_amount: 3,
    created_at: new Date(),
  },
];


const fakeRepository: ProductRepository = {
  create: async (product: Product) => {
    return product
  },
  get: async (productId: string) => {
    const product = products.find((item) => item.id === productId)

    if(!product){
      return null
    }

    return product
  }
}

let sut: LowStockProductUseCase

describe("Low stock product", () => {
  beforeEach(() => {
    sut = new LowStockProductUseCase(fakeRepository)
  })

  it("should be able to find product with min quantity is greater than amount in stock", async () => {
    const { product } = await sut.execute({ id: "1" })

    expect(product).toEqual(expect.objectContaining(
      {
        id: "1",
        name: "T-Shirt",
        size: "M",
        color: "Blue",
        amount: 8,
        min_amount: 10,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    ))
  })

  it("should not be able to find product with min quantity is smaller than amount in stock", async () => {
    const { product } = await sut.execute({ id: "2" })

    expect(product).toBe(null)

  })
  
  it("should not be able to find product wrong id", async () => {
   await expect(() => sut.execute({ id: "wrong-id" })).rejects.toBeInstanceOf(ResourceNotFound)
  })
})