import { randomUUID } from 'node:crypto'
import type { Status } from './value-object/status'

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

export class Sale {
  public id: string
  public name: string
  public productId: string
  public customerId: string
  public amount: number
  public status: Status
  public created_at: Date
  public updated_at: Date

  constructor(props: SaleProps){
    this.id = props.id ?? randomUUID()
    this.name = props.name
    this.productId = props.productId
    this.customerId = props.customerId
    this.amount = props.amount
    this.status = props.status
    this.created_at = props.created_at
    this.updated_at = props.updated_at
  }
}