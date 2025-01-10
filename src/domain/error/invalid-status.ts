export class InvalidStatus extends Error {
  
  constructor(message: string){
    super(`Invalid Status: ${message}`)
  }
}