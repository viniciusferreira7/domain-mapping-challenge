import type { Optional } from '@/core/types/optional';
import type { Sale } from '../entities/sale';
import type { SalesRepository } from '../repositories/sales-repository';
import type { ProductRepository } from '../repositories/product-repository';
import { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import { ResourceNotFound } from '../error/resource-not-found';
import { InvalidSale } from '../error/invalid-sale';

type CreateSaleUseCaseRequest = Optional<Sale, 'id' | 'profit' | 'createdAt' | 'updatedAt' | 'status'>

interface CreateSaleUseCaseResponse {
  sale: Sale
}

export class CreateSale {
  constructor(
    private salesRepository: SalesRepository,
    private productsRepository: ProductRepository){}

  async execute({ 
    name,
    productId,
    customerId,
    amount,
    profit,
   }: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse>{
    const product = await this.productsRepository.get(new UniqueEntityId(productId))

    if(!product){
      throw new ResourceNotFound()
    }

      await this.productsRepository.update(product.id,{
        amount: product.amount - amount
    })

    if(amount > product.amount){
      throw new InvalidSale()
    }

    const sale = await this.salesRepository.create({
      name,
      productId,
      customerId,
      amount,
      profit: product.prize * amount,
    })

    return { sale }
  }

}