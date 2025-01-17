import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface ProductProps {
  id?: UniqueEntityId
  name: string
  size: string
  color: string
  amount: number
  prize: number
  min_amount: number
  created_at: Date
  updated_at?: Date
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name;
  }

  get size() {
    return this.props.size;
  }

  get color() {
    return this.props.color;
  }

  get amount() {
    return this.props.amount;
  }

  get prize(){
    return this.props.prize
  }

  get min_amount() {
    return this.props.min_amount;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  static create(props: Optional<ProductProps, "id" | "created_at" | "updated_at">){
    const product = new Product({
      ...props,
      created_at: new Date(),
      updated_at: new Date(),
    },
    props.id
  )

    return product
  }
}