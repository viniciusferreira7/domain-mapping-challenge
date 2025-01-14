import { randomUUID } from 'node:crypto'

interface ProductProps {
  id?: string
  name: string
  size: string
  color: string
  amount: number
  min_amount: number
  created_at: Date
  updated_at?: Date
}

export class Product {
  public id: string
  public name: string
  public size: string
  public color: string
  public amount: number
  public min_amount: number
  public created_at: Date
  public updated_at?: Date

  constructor(props: ProductProps){
    this.id = props.id ?? randomUUID()
    this.name = props.name
    this.size = props.size
    this.color = props.color
    this.amount = props.amount
    this.min_amount = props.min_amount
    this.created_at = props.created_at
    this.updated_at = props.updated_at
  }

}