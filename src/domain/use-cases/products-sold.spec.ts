import { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import { Product } from '../entities/product';
import { Sale } from '../entities/sale';
import type { SalesRepository } from '../repositories/sales-repository';
import { Status } from '../entities/value-object/status';
import dayjs from 'dayjs';
import { ProductsSoldUseCase } from './products-sold';

let products: Product[]

let sales: Sale[] 

const fakeRepository: SalesRepository = {
  get: async (date: string, status = "delivered") => {
    const deliveredSales = sales.filter((item) => {
      const isDeliveredStatus = item.status.value === status
      const isSameDate = dayjs(item.createdAt).isSame(dayjs(date), "date")
      console.log({isDeliveredStatus, isSameDate, item: item.name, createdAt: item.createdAt})

      return isDeliveredStatus && isSameDate
    })

    return deliveredSales
    
  }
}

let sut: ProductsSoldUseCase

describe("Products sold", () => {
  beforeEach(() => {
    vi.useFakeTimers()

    vi.setSystemTime(new Date(2000, 0, 5, 8, 0, 0))
    vi.advanceTimersByTime(100 * 60 * 60 * 24 * 10)


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
    
    sales = [
     Sale.create({
      id: new UniqueEntityId("1"),
      name: "sale-1",
      amount: 10,
      productId: "1",
      customerId: "customer-1",
      status: new Status("delivered"),
     }),
     Sale.create({
      id: new UniqueEntityId("2"),
      name: "sale-2",
      amount: 2,
      productId: "1",
      customerId: "customer-2",
      status: new Status("canceled"),
     }),
     Sale.create({
      id: new UniqueEntityId("3"),
      name: "sale-3",
      amount: 2,
      productId: "3",
      customerId: "customer-1",
      status: new Status("delivered"),
     }),
     Sale.create({
      id: new UniqueEntityId("4"),
      name: "sale-4",
      amount: 12,
      productId: "2",
      customerId: "customer-3",
      status: new Status("delivered"),
     }),
     Sale.create({
      id: new UniqueEntityId("5"),
      name: "sale-5",
      amount: 1,
      productId: "3",
      customerId: "customer-4",
      status: new Status("processing"),
     }),
     Sale.create({
      id: new UniqueEntityId("5"),
      name: "sale-5",
      amount: 8,
      productId: "3",
      customerId: "customer-5",
      status: new Status("delivered"),
     }),
     Sale.create({
      id: new UniqueEntityId("6"),
      name: "sale-6",
      amount: 3,
      productId: "2",
      customerId: "customer-2",
      status: new Status("pending"),
     }),
    ]


    sut = new ProductsSoldUseCase(fakeRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("Should be able to get delivered sales and its amount", async () => {
    const response = await sut.execute({ date: "2000-01-05" })


    console.log({response})
  })
})