import type { Product } from '../entities/product';
import type { Sale } from '../entities/sale';
import type { SalesRepository } from '../repositories/sales-repository';

interface GetTopSellingProductsByPeriodUseCaseRequest {}

interface SalesWithProducts extends Sale {
  product: Product
}

type GetTopSellingProductsByPeriodUseCaseResponse = Record<string, Product>

export class GetTopSellingProductsByPeriodUseCase {
  constructor(private salesRepository: SalesRepository){}
  
  async execute(_props: GetTopSellingProductsByPeriodUseCaseRequest): Promise<GetTopSellingProductsByPeriodUseCaseResponse>{
    const response = await this.salesRepository.fetchBestSellingProductsByPeriod()

    return response
  }
}