import type { Status } from './value-object/status'

export class Sale {
  public id: string
  public name: string
  public productId: string
  public customerId: string
  public min_amount: number
  public status: Status
  public created_at: Date
  public updated_at: Date
}