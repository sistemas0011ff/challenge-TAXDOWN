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
const CustomerUpdateUseCase_1 = require("../../../../../contexts/customer/application/usecases/CustomerUpdateUseCase");
const UpdateCustomerCommand_1 = require("../../../../../contexts/customer/application/commands/UpdateCustomerCommand");
describe('CustomerUpdateUseCase', () => {
    let customerUpdateUseCase;
    let mockCommandHandler;
    beforeEach(() => {
        mockCommandHandler = {
            handle: jest.fn(),
        };
        customerUpdateUseCase = new CustomerUpdateUseCase_1.CustomerUpdateUseCase(mockCommandHandler);
    });
    it('debería actualizar un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerData = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        };
        const customerConfirmation = {
            success: true,
            responseCode: '200',
            message: 'Cliente actualizado correctamente',
            customerId: '1',
            customer: customerData,
        };
        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: customerConfirmation,
        });
        const result = yield customerUpdateUseCase.updateCustomer(customerData);
        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new UpdateCustomerCommand_1.UpdateCustomerCommand(customerData));
        expect(result).toEqual(customerData);
    }));
    it('debería lanzar un error si la actualización del cliente falla', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerData = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        };
        mockCommandHandler.handle.mockResolvedValue({
            result: false,
            value: {
                success: false,
                responseCode: '500',
                message: 'Error al actualizar el cliente',
                customerId: '1',
            },
        });
        yield expect(customerUpdateUseCase.updateCustomer(customerData)).rejects.toThrow("Error al actualizar el cliente");
        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new UpdateCustomerCommand_1.UpdateCustomerCommand(customerData));
    }));
    it('debería lanzar un error si no se devuelve el cliente actualizado', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerData = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        };
        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: {
                success: true,
                responseCode: '200',
                message: 'Cliente actualizado correctamente',
                customerId: '1',
                customer: undefined,
            },
        });
        yield expect(customerUpdateUseCase.updateCustomer(customerData)).rejects.toThrow("Error al actualizar el cliente");
        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new UpdateCustomerCommand_1.UpdateCustomerCommand(customerData));
    }));
});
