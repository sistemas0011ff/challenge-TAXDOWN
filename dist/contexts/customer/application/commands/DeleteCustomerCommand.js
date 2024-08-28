"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCustomerCommand = void 0;
class DeleteCustomerCommand {
    constructor(customerId) {
        this.customerId = customerId;
    }
    validate() {
        if (!this.customerId) {
            throw new Error("ID del cliente no proporcionado.");
        }
    }
}
exports.DeleteCustomerCommand = DeleteCustomerCommand;
