interface ProductProps {
  id: string
  name: string
  amount: number
  created_at: Date
  updated_at: Date
}

export class Product {
  public id?: string
  public name: string
  public amount: number
  public min_amount: number
  public created_at: Date
  public updated_at: Date

  constructor(props: ProductProps){
    
  }

}