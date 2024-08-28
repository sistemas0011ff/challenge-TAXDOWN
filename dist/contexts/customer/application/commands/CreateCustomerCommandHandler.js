"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerCommandHandler = void 0;
const typedi_1 = require("typedi");
const CustomerData_1 = require("../dtos/CustomerData");
let CreateCustomerCommandHandler = class CreateCustomerCommandHandler {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Utilizando CustomerData como entidad directamente
                const customerData = new CustomerData_1.CustomerData({
                    id: command.customerData.id,
                    name: command.customerData.name,
                    email: command.customerData.email,
                    phoneNumber: command.customerData.phoneNumber,
                    address: command.customerData.address,
                    availableCredit: command.customerData.availableCredit,
                    created: command.customerData.created,
                    edited: command.customerData.edited
                });
                const customerId = yield this.customerRepository.save(customerData);
                return {
                    result: true,
                    value: {
                        success: true,
                        responseCode: "0",
                        message: "Cliente creado con éxito",
                        customerId: customerId,
                        customer: customerData
                    }
                };
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "Unknown error";
                return {
                    result: false,
                    value: {
                        success: false,
                        responseCode: "1",
                        message: message,
                    }
                };
            }
        });
    }
};
exports.CreateCustomerCommandHandler = CreateCustomerCommandHandler;
exports.CreateCustomerCommandHandler = CreateCustomerCommandHandler = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], CreateCustomerCommandHandler);
