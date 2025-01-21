import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import type { Product } from '../entities/product';

export interface ProductRepository {
  get(productId: UniqueEntityId): Promise<Product | null>
}