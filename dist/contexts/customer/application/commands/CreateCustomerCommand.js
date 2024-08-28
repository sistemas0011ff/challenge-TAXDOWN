"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerCommand = void 0;
class CreateCustomerCommand {
    constructor(customerData) {
        this.customerData = customerData;
    }
    validate() {
        if (!this.customerData.name) {
            throw new Error("Datos del cliente incompletos o inválidos.");
        }
    }
}
exports.CreateCustomerCommand = CreateCustomerCommand;
