import { Product } from '../entities/product';
import { ResourceNotFound } from '../error/resource-not-found';
import type { ProductRepository } from '../repositories/product-repository';

interface LowStockProductUseCaseRequest {
  id: string
}

interface LowStockProductUseCaseResponse {
  product: Product | null
}

export class LowStockProductUseCase {
  constructor(private productRepository: ProductRepository){}

  async execute(props: LowStockProductUseCaseRequest): Promise<LowStockProductUseCaseResponse>{
    const product = await this.productRepository.get(props.id)

    if(!product){
      throw new ResourceNotFound()
    }

    const hasSmallerAmount = product.amount <= product.min_amount

    if(hasSmallerAmount){
      return { product }
    }

    return { product: null }
  }
}