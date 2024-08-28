import { ICommand } from "../../../shared/cqrs/ICommand";

export class AddCreditCommand implements ICommand {
    constructor(public readonly customerId: number, public readonly creditAmount: number) {}

    validate(): void | Promise<void> {
        if (!this.customerId) {
            throw new Error("ID del cliente no proporcionado.");
        }
        if (this.creditAmount <= 0) {
            throw new Error("El monto del crédito debe ser mayor a cero.");
        }
    }
}