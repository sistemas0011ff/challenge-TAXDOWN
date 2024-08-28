import { CustomerData } from "../dtos/CustomerData";
import { ICommand } from "../../../shared/cqrs/ICommand";

export class CreateCustomerCommand implements ICommand {
    constructor(public readonly customerData: CustomerData) {}

    validate(): void | Promise<void> {
        if (!this.customerData.name) {
            throw new Error("Datos del cliente incompletos o inválidos.");
        }
    }
}
