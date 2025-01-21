import { Entity } from '@/core/entities/entity'
import type { Status } from './value-object/status'
import type { Optional } from '@/core/types/optional'
import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id'

interface SaleProps {
  id?: UniqueEntityId
  name: string
  productId: string
  customerId: string
  amount: number
  profit: number
  status: Status
  createdAt: Date
  updatedAt: Date
}

export class Sale extends Entity<SaleProps> {
  get name(): string {
    return this.props.name;
  }

  get productId(): string {
    return this.props.productId;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get amount(): number {
    return this.props.amount;
  }

  get profit(): number {
    return this.props.profit;
  }

  get status(): Status {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  static create(props: Optional<SaleProps, "id" | "createdAt" | "updatedAt">){
     const sale = new Sale({
       ...props,
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     props.id
   )
 
     return sale
   }
}