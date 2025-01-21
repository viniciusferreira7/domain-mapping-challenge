import type { Product } from '@/domain/entities/product';
import type { ProductRepository } from '../product-repository';
import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';

export class InMemoryProductsRepository implements ProductRepository {
  constructor(public products: Product[]){}

    async get(productId: UniqueEntityId): Promise<Product | null> {
      const product = this.products.find((item) => {
        return item.id.toString === productId.toString
      })
  
      if(!product){
        return null
      }
  
      return product
    }

  
}