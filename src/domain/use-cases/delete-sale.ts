import { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import type { Sale } from '../entities/sale';
import { InvalidSale } from '../error/invalid-sale';
import { ResourceNotFound } from '../error/resource-not-found';
import type { ProductRepository } from '../repositories/product-repository';
import type { SalesRepository } from '../repositories/sales-repository';

interface DeleteSaleUseCaseRequest {
  saleId: string
}

interface DeleteSaleUseCaseResponse {
  sale: Sale | null
}

export class DeleteSale {
  constructor(
    private salesRepository: SalesRepository,
  ){}
  async execute({ 
   saleId,
   }: DeleteSaleUseCaseRequest): Promise<DeleteSaleUseCaseResponse>{
    const sale = await this.salesRepository.deleteById(new UniqueEntityId(saleId))

    if(!sale){
      throw new ResourceNotFound()
    }

    return { sale }
  }

}