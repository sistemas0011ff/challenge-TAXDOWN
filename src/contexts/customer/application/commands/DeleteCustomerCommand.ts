import { ICommand } from "../../../shared/cqrs/ICommand";

export class DeleteCustomerCommand implements ICommand {
    constructor(public readonly customerId: number) {}

    validate(): void | Promise<void> {
        if (!this.customerId) {
            throw new Error("ID del cliente no proporcionado.");
        }
    }
}
