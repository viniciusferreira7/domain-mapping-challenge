import type { Optional } from '@/core/types/optional';
import type { Sale } from '../entities/sale';
import type { SalesRepository } from '../repositories/sales-repository';

type CreateSaleUseCaseRequest = Optional<Sale, 'id' | 'createdAt' | 'updatedAt' | 'status'>

interface CreateSaleUseCaseResponse {
  sale: Sale
}

export class CreateSale {
  constructor(private salesRepository: SalesRepository){}

  async execute({ 
    name,
    productId,
    customerId,
    amount,
    profit,
   }: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse>{
    const sale = await this.salesRepository.create({
      name,
      productId,
      customerId,
      amount,
      profit,
    })

    return { sale }
  }

}