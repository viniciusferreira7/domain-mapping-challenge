import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import type { Product } from '../entities/product';

export interface ProductRepository {
  update(id: UniqueEntityId, params: Partial<Product>): Promise<Product | null>
  get(productId: UniqueEntityId): Promise<Product | null>
}