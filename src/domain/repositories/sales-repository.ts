import type { Optional } from '@/core/types/optional';
import type { Product } from '../entities/product';
import type { Sale } from '../entities/sale';
import type { StatusType } from '../entities/value-object/status';
import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';

interface UpdateSaleParams {
  saleId: string
  fields: {
    name?: string
    size?: string
    productId?: string
    customerId?: string
    amount?: number
    profit?: number
    status?: StatusType
  }
}

type CreateParams = Optional<Sale, 'id' | 'createdAt' | 'updatedAt' | 'status'>

type FetchAndProductsResponse = Record<string, Product>
export interface SalesRepository {
  deleteById(id: UniqueEntityId): Promise<Sale | null>
  update(params: UpdateSaleParams): Promise<Sale | null>
  create(params: CreateParams): Promise<Sale>
  get(date: string, status: StatusType): Promise<Sale[]> 
  getById(id: UniqueEntityId): Promise<Sale | null>
  fetchBestSellingProductsByPeriod(): Promise<FetchAndProductsResponse>
}