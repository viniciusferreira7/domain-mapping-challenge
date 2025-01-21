import { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import dayjs from 'dayjs';
import { Product } from '../entities/product';
import { Sale } from '../entities/sale';
import { Status } from '../entities/value-object/status';
import type { SalesRepository } from '../repositories/sales-repository';
import { ProductsSoldUseCase } from './products-sold';
import { InMemorySalesRepository } from '../repositories/in-memory/in-memory-sales-repository';

let products: Product[]

let sales: Sale[] = []

let inMemorySalesRepository: InMemorySalesRepository

let sut: ProductsSoldUseCase

describe("Products sold", () => {
  beforeEach(() => {
    vi.useFakeTimers()

    vi.setSystemTime(new Date(2000, 0, 5, 8, 0, 0))


     products = [
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


    sales.push( Sale.create({
      id: new UniqueEntityId("1"),
      name: "sale-1",
      amount: 10,
      profit: products[1].prize * 10,
      productId: "1",
      customerId: "customer-1",
      status: new Status("delivered"),
     }))

    vi.setSystemTime(new Date(2000, 0, 6, 8, 0, 0))

    sales.push(Sale.create({
      id: new UniqueEntityId("2"),
      name: "sale-2",
      amount: 2,
      profit: products[1].prize * 2,
      productId: "1",
      customerId: "customer-2",
      status: new Status("canceled"),
     }),)

    vi.setSystemTime(new Date(2000, 0, 5, 8, 0, 0))

    sales.push( Sale.create({
      id: new UniqueEntityId("3"),
      name: "sale-3",
      amount: 2,
      profit: products[3].prize * 2,
      productId: "3",
      customerId: "customer-1",
      status: new Status("delivered"),
     }),)

    vi.setSystemTime(new Date(2000, 0, 6, 8, 0, 0))
 
    sales.push(Sale.create({
      id: new UniqueEntityId("4"),
      name: "sale-4",
      amount: 12,
      profit: products[2].prize * 12,
      productId: "2",
      customerId: "customer-3",
      status: new Status("delivered"),
     }),)

    vi.setSystemTime(new Date(2000, 0, 14, 8, 0, 0))
 
    sales.push(Sale.create({
      id: new UniqueEntityId("5"),
      name: "sale-5",
      amount: 1,
      profit: products[3].prize * 1,
      productId: "3",
      customerId: "customer-4",
      status: new Status("processing"),
     }),)

     vi.setSystemTime(new Date(2000, 0, 6, 8, 0, 0)) 

    sales.push( Sale.create({
      id: new UniqueEntityId("6"),
      name: "sale-6",
      amount: 8,
      profit: products[2].prize * 8,
      productId: "2",
      customerId: "customer-6",
      status: new Status("delivered"),
     }),
     Sale.create({
      id: new UniqueEntityId("6"),
      name: "sale-6",
      amount: 3,
      profit: products[2].prize * 3,
      productId: "2",
      customerId: "customer-2",
      status: new Status("pending"),
     }),
    )

    inMemorySalesRepository = new InMemorySalesRepository(sales, products)
    
    sut = new ProductsSoldUseCase(inMemorySalesRepository)

  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("Should be able to get delivered sales and its amount", async () => {
    const expectedDate = "2000-01-05"
    const { amount, sales } = await sut.execute({ date: expectedDate })

    expect(amount).toEqual(sales.reduce((acc, current) => acc + current.amount, 0))
    expect(sales.every(item => dayjs(item.createdAt).isSame(expectedDate, 'days'))).toBe(true)

  })

  it("Should not be able to get delivered sales and its amount with wrong date", async () => {
    const expectedDate = "2000-11-22"
    const { amount, sales } = await sut.execute({ date: expectedDate })


    expect(amount).toEqual(0)
    expect(sales).toHaveLength(0)
  })
})