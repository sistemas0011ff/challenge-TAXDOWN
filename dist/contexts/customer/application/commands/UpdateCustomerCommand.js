"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerCommand = void 0;
class UpdateCustomerCommand {
    constructor(customerData) {
        this.customerData = customerData;
    }
    validate() {
        if (!this.customerData.id) {
            throw new Error("ID del cliente no proporcionado.");
        }
        if (!this.customerData.name) {
            throw new Error("Datos del cliente incompletos o inválidos.");
        }
    }
}
exports.UpdateCustomerCommand = UpdateCustomerCommand;
