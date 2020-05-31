import { PipeTransform, BadRequestException } from "@nestjs/common";
import { OrderStatus } from "../order-status.enum";

export class OrderStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    OrderStatus.WAITING_FOR_PAYMENT,
    OrderStatus.PROCESSING,
    OrderStatus.SHIPPING,
    OrderStatus.COMPLETE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is and invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
