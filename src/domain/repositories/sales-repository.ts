import type { Optional } from '@/core/types/optional';
import type { Product } from '../entities/product';
import type { Sale } from '../entities/sale';
import type { StatusType } from '../entities/value-object/status';

type CreateParams = Optional<Sale, 'id' | 'createdAt' | 'updatedAt' | 'status'>

type FetchAndProductsResponse = Record<string, Product>
export interface SalesRepository {
  create(params: CreateParams): Promise<Sale>
  get(date: string, status: StatusType): Promise<Sale[]> 
  fetchBestSellingProductsByPeriod(): Promise<FetchAndProductsResponse>
}