import { randomUUID } from 'node:crypto'
import type { Status } from './value-object/status'
import { Entity } from '@/core/entities/entity'

interface SaleProps {
  id?: string
  name: string
  productId: string
  customerId: string
  amount: number
  status: Status
  created_at: Date
  updated_at: Date
}

export class Sale extends Entity<SaleProps> {
 
}