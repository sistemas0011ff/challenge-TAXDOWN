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
const CustomerCreationUseCase_1 = require("../../../../../contexts/customer/application/usecases/CustomerCreationUseCase");
const CreateCustomerCommand_1 = require("../../../../../contexts/customer/application/commands/CreateCustomerCommand");
describe('CustomerCreationUseCase', () => {
    let customerCreationUseCase;
    let mockCommandHandler;
    beforeEach(() => {
        mockCommandHandler = {
            handle: jest.fn(),
        };
        customerCreationUseCase = new CustomerCreationUseCase_1.CustomerCreationUseCase(mockCommandHandler);
    });
    it('debería crear un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
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
            message: 'Cliente creado correctamente',
            customerId: '1',
            customer: customerData,
        };
        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: customerConfirmation,
        });
        const result = yield customerCreationUseCase.createCustomer(customerData);
        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new CreateCustomerCommand_1.CreateCustomerCommand(customerData));
        expect(result).toEqual(customerData);
    }));
    it('debería lanzar un error si la creación del cliente falla', () => __awaiter(void 0, void 0, void 0, function* () {
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
                message: 'Error al crear el cliente',
            },
        });
        yield expect(customerCreationUseCase.createCustomer(customerData)).rejects.toThrow("Error al crear el cliente");
        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new CreateCustomerCommand_1.CreateCustomerCommand(customerData));
    }));
    it('debería lanzar un error si no se devuelve el cliente creado', () => __awaiter(void 0, void 0, void 0, function* () {
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
        // Simulando que el cliente no se devuelve, pero el resultado es exitoso.
        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: {
                success: true,
                responseCode: '200',
                message: 'Cliente creado correctamente',
                customerId: '1',
                customer: undefined, // Simulando que no se devuelve el cliente
            },
        });
        yield expect(customerCreationUseCase.createCustomer(customerData)).rejects.toThrow("Error al crear el cliente");
        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new CreateCustomerCommand_1.CreateCustomerCommand(customerData));
    }));
});
