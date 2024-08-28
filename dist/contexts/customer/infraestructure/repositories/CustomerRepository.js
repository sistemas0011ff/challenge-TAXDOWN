"use strict";
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
exports.CustomerRepository = void 0;
const CustomerData_1 = require("../../application/dtos/CustomerData");
class CustomerRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    save(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCustomer = yield this.prisma.customer.create({
                data: {
                    name: customerData.name,
                    email: customerData.email,
                    phoneNumber: customerData.phoneNumber,
                    address: customerData.address,
                    availableCredit: customerData.availableCredit,
                    created: customerData.created,
                    edited: customerData.edited
                },
            });
            return newCustomer.id.toString();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.prisma.customer.findUnique({
                where: { id: id },
            });
            if (customer) {
                return new CustomerData_1.CustomerData({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email,
                    phoneNumber: customer.phoneNumber,
                    address: customer.address,
                    availableCredit: customer.availableCredit,
                    created: customer.created,
                    edited: customer.edited
                });
            }
            return null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const customerList = yield this.prisma.customer.findMany();
            return customerList.map((c) => new CustomerData_1.CustomerData({
                id: c.id,
                name: c.name,
                email: c.email,
                phoneNumber: c.phoneNumber,
                address: c.address,
                availableCredit: c.availableCredit,
                created: c.created,
                edited: c.edited
            }));
        });
    }
    update(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCustomer = yield this.prisma.customer.update({
                where: { id: customerData.id },
                data: {
                    name: customerData.name,
                    email: customerData.email,
                    phoneNumber: customerData.phoneNumber,
                    address: customerData.address,
                    availableCredit: customerData.availableCredit,
                    edited: new Date(),
                },
            });
            return new CustomerData_1.CustomerData({
                id: updatedCustomer.id,
                name: updatedCustomer.name,
                email: updatedCustomer.email,
                phoneNumber: updatedCustomer.phoneNumber,
                address: updatedCustomer.address,
                availableCredit: updatedCustomer.availableCredit,
                created: updatedCustomer.created,
                edited: updatedCustomer.edited,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.customer.delete({
                where: { id: id },
            });
        });
    }
    addCredit(customerId, creditAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.prisma.customer.findUnique({ where: { id: customerId } });
            if (!customer) {
                throw new Error('Cliente no encontrado');
            }
            const updatedCustomer = yield this.prisma.customer.update({
                where: { id: customerId },
                data: {
                    availableCredit: customer.availableCredit + creditAmount,
                    edited: new Date(),
                },
            });
            return new CustomerData_1.CustomerData({
                id: updatedCustomer.id,
                name: updatedCustomer.name,
                email: updatedCustomer.email,
                phoneNumber: updatedCustomer.phoneNumber,
                address: updatedCustomer.address,
                availableCredit: updatedCustomer.availableCredit,
                created: updatedCustomer.created,
                edited: updatedCustomer.edited,
            });
        });
    }
    findAllOrderedByCredit() {
        return __awaiter(this, void 0, void 0, function* () {
            const customerList = yield this.prisma.customer.findMany({
                orderBy: {
                    availableCredit: 'desc',
                },
            });
            return customerList.map((c) => new CustomerData_1.CustomerData({
                id: c.id,
                name: c.name,
                email: c.email,
                phoneNumber: c.phoneNumber,
                address: c.address,
                availableCredit: c.availableCredit,
                created: c.created,
                edited: c.edited,
            }));
        });
    }
}
exports.CustomerRepository = CustomerRepository;
