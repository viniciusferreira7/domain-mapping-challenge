import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import type { ProductRepository } from '../repositories/product-repository';
import { ResourceNotFound } from '../error/resource-not-found';

interface GetProfitByProductUseCaseRequest {
  productId: UniqueEntityId
}

interface GetProfitByProductUseCaseResponse {
  profit: number
}

export class GetProfitByProductUseCase {
  constructor (private productsRepository: ProductRepository){}

  async execute({ productId }: GetProfitByProductUseCaseRequest): Promise<GetProfitByProductUseCaseResponse>{
    const product = await this.productsRepository.get(productId)

    if(!product){
      throw new ResourceNotFound()
    }
  }
}