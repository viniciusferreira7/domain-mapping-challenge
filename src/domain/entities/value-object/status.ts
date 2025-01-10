import { InvalidStatus } from '@/domain/error/invalid-status'

export type StatusType =   'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled' 


export class Status {
  public value: StatusType

  constructor(value: StatusType){
    this.value = value
  }

  /**
 * Validates the current status and updates it to the next appropriate status in the workflow.
 * 
 * If the provided status is "pending", it transitions to "processing". 
 * Otherwise, an error is thrown indicating an invalid status.
 *
 * Example:
 * Input: "pending" 
 * Output: "processing"
 * 
 * @param status - The current status of the process. 
 *                    Must be one of: "pending" | "cancelled" | "completed".
 * @returns A new Status instance with the updated value.
 * @throws InvalidStatus - If the current status is not "pending".
 */
  static approve (status: StatusType){
    if(status !== 'pending'){
      throw new InvalidStatus('You can only approve pending orders.')
    }
    
    return new Status('processing')

  }

  /**
 * Cancels an order if it is in an appropriate status.
 * 
 * This method allows cancellation only if the current status is "pending" or "processing".
 * If the status is not eligible for cancellation (e.g., "completed" or "dispatched"), 
 * an error is thrown with a descriptive message.
 *
 * Example:
 * Input: "pending" 
 * Output: A new Status instance with the value "canceled".
 * 
 * @param status - The current status of the order.
 *                 Must be one of: "pending" | "processing".
 * @returns A new Status instance with the updated value "canceled".
 * @throws InvalidStatus - If the order status is not "pending" or "processing".
 */
  static cancel(status: StatusType){
    if(!['pending', 'processing'].includes(status)){
      throw new InvalidStatus('You cannot cancel orders after dispatch orders.')
    }

    return new Status('canceled')
  }

  /**
   * Marks an order as dispatched if it is in the "processing" status.
   * 
   * This method transitions an order from the "processing" status to "delivering". 
   * If the current status is not "processing", an error is thrown with a descriptive message.
   *
   * Example:
   * Input: "processing"
   * Output: A new Status instance with the value "delivering".
   * 
   * @param status - The current status of the order.
   *                 Must be "processing" to proceed.
   * @returns A new Status instance with the updated value "delivering".
   * @throws InvalidStatus - If the order status is not "processing".
  */
  static dispatch(status: StatusType){
    if(status != 'processing'){
      throw new InvalidStatus('You cannot dispatch orders that are not in "processing" status.')
    }

    return new Status('delivering')
  }

  /**
   * Marks an order as delivered if it is in the "delivering" status.
   * 
   * This method ensures that only orders with a status of "delivering" 
   * can be transitioned to "delivered". If the status is not "delivering", 
   * an error is thrown with a descriptive message.
   *
   * Example:
   * Input: "delivering"
   * Output: A new Status instance with the value "delivered".
   * 
   * @param status - The current status of the order.
   *                 Must be "delivering" to proceed.
   * @returns A new Status instance with the updated value "delivered".
   * @throws InvalidStatus - If the order status is not "delivering".
  */
  static deliver(status: StatusType){
    if(status != 'delivering'){
      throw new InvalidStatus('You cannot deliver orders that are not in "delivering" status.')
    }

    return new Status('delivered')
  }
}
