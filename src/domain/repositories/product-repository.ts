import type { Product } from '../entities/product';

export interface ProductRepository {
  create(product: Product): Promise<Product>
  get(productId: string): Promise<Product | null>
}