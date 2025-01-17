import type { Product } from '../entities/product'
import type { Sale } from '../entities/sale'
import type { SalesRepository } from '../repositories/sales-repository'

interface ProductsSoldUseCaseRequest {
  date: string
}

interface ProductsSoldUseCaseResponse {
  amount: number
  sales: Sale[]
}

export class ProductsSoldUseCase {
  constructor(private salesRepository: SalesRepository){}

  async execute({date}: ProductsSoldUseCaseRequest): Promise<ProductsSoldUseCaseResponse>{
    const sales = await this.salesRepository.get(date, "delivered")

    const amount = sales.reduce((acc, current) => acc + current.amount, 0)

    return { amount, sales }
  }
}