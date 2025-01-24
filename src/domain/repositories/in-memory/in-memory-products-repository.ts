import { Product } from '@/domain/entities/product';
import type { ProductRepository } from '../product-repository';
import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import type { Optional } from '@/core/types/optional';

export class InMemoryProductsRepository implements ProductRepository {
  constructor(public products: Product[]){}

  async update(productId: UniqueEntityId, params:  Optional<Product, 'createdAt' | 'updatedAt'>) {
    let updatedProductIndex = this.products.findIndex((product) => product.id.toString === productId.toString)

    if(updatedProductIndex >= 0){
      const updatedProduct = this.products[updatedProductIndex]

      this.products[updatedProductIndex] = new Product({
        id: updatedProduct.id,
        amount: params.amount ?? updatedProduct.amount,
        color: params.color ?? updatedProduct.color,
        name: params.name ?? updatedProduct.name,
        min_amount: params.min_amount ?? updatedProduct.min_amount,
        prize: params.prize ?? updatedProduct.prize,
        size: params.size ?? updatedProduct.size,
        createdAt: updatedProduct.createdAt,
        updatedAt: new Date(),
      })

      return this.products[updatedProductIndex]
    }

    return null

  }

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