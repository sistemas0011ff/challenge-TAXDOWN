"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCreditCommand = void 0;
class AddCreditCommand {
    constructor(customerId, creditAmount) {
        this.customerId = customerId;
        this.creditAmount = creditAmount;
    }
    validate() {
        if (!this.customerId) {
            throw new Error("ID del cliente no proporcionado.");
        }
        if (this.creditAmount <= 0) {
            throw new Error("El monto del crédito debe ser mayor a cero.");
        }
    }
}
exports.AddCreditCommand = AddCreditCommand;
