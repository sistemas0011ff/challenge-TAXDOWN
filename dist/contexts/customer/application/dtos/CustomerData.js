"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerData = void 0;
class CustomerData {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.address = data.address;
        this.availableCredit = data.availableCredit;
        this.created = data.created;
        this.edited = data.edited;
    }
}
exports.CustomerData = CustomerData;
