import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import type { Product } from '../entities/product';

export interface ProductRepository {
  create(product: Product): Promise<Product>
  get(productId: UniqueEntityId): Promise<Product | null>
}