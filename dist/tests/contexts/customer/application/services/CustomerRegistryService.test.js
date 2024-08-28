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
const CustomerData_1 = require("../../../../../contexts/customer/application/dtos/CustomerData");
const CustomerRegistryService_1 = require("../../../../../contexts/customer/application/services/CustomerRegistryService");
jest.mock('../../../../../contexts/customer/application/interfaces/ICustomerCreationUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/IRetrieveCustomerUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/IRetrieveCustomerByIdUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/ICustomerUpdateUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/ICustomerDeleteUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/ICustomerCreditUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/IListCustomersByCreditUseCase');
describe('CustomerRegistryService', () => {
    let service;
    let mockCustomerCreationUseCase;
    let mockRetrieveCustomerUseCase;
    let mockRetrieveCustomerByIdUseCase;
    let mockCustomerUpdateUseCase;
    let mockCustomerDeleteUseCase;
    let mockCustomerCreditUseCase;
    let mockListCustomersByCreditUseCase;
    beforeEach(() => {
        mockCustomerCreationUseCase = {
            createCustomer: jest.fn(),
        };
        mockRetrieveCustomerUseCase = {
            execute: jest.fn(),
        };
        mockRetrieveCustomerByIdUseCase = {
            execute: jest.fn(),
        };
        mockCustomerUpdateUseCase = {
            updateCustomer: jest.fn(),
        };
        mockCustomerDeleteUseCase = {
            deleteCustomer: jest.fn(),
        };
        mockCustomerCreditUseCase = {
            addCredit: jest.fn(),
        };
        mockListCustomersByCreditUseCase = {
            execute: jest.fn(),
        };
        service = new CustomerRegistryService_1.CustomerRegistryService(mockCustomerCreationUseCase, mockRetrieveCustomerUseCase, mockRetrieveCustomerByIdUseCase, mockCustomerUpdateUseCase, mockCustomerDeleteUseCase, mockCustomerCreditUseCase, mockListCustomersByCreditUseCase);
    });
    it('debería crear un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerData = new CustomerData_1.CustomerData({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        });
        const expectedCustomer = new CustomerData_1.CustomerData({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        });
        mockCustomerCreationUseCase.createCustomer.mockResolvedValue(expectedCustomer);
        const result = yield service.createCustomer(customerData);
        expect(mockCustomerCreationUseCase.createCustomer).toHaveBeenCalledWith(customerData);
        expect(result).toEqual(expectedCustomer);
    }));
    it('debería listar clientes correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCustomers = [
            new CustomerData_1.CustomerData({
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                phoneNumber: '1234567890',
                address: '123 Main St',
                availableCredit: 1000,
                created: new Date(),
                edited: new Date(),
            }),
            new CustomerData_1.CustomerData({
                id: 2,
                name: 'Jane Doe',
                email: 'janedoe@example.com',
                phoneNumber: '0987654321',
                address: '456 Elm St',
                availableCredit: 2000,
                created: new Date(),
                edited: new Date(),
            }),
        ];
        mockRetrieveCustomerUseCase.execute.mockResolvedValue(mockCustomers);
        const result = yield service.listCustomers();
        expect(mockRetrieveCustomerUseCase.execute).toHaveBeenCalled();
        expect(result).toEqual(mockCustomers);
    }));
    it('debería obtener un cliente por ID correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerId = 1;
        const expectedCustomer = new CustomerData_1.CustomerData({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        });
        mockRetrieveCustomerByIdUseCase.execute.mockResolvedValue(expectedCustomer);
        const result = yield service.getCustomerById(customerId);
        expect(mockRetrieveCustomerByIdUseCase.execute).toHaveBeenCalledWith(customerId);
        expect(result).toEqual(expectedCustomer);
    }));
    it('debería actualizar un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerData = new CustomerData_1.CustomerData({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        });
        const updatedCustomer = new CustomerData_1.CustomerData({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1500,
            created: new Date(),
            edited: new Date(),
        });
        mockCustomerUpdateUseCase.updateCustomer.mockResolvedValue(updatedCustomer);
        const result = yield service.updateCustomer(customerData);
        expect(mockCustomerUpdateUseCase.updateCustomer).toHaveBeenCalledWith(customerData);
        expect(result).toEqual(updatedCustomer);
    }));
    it('debería eliminar un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerId = 1;
        mockCustomerDeleteUseCase.deleteCustomer.mockResolvedValue();
        yield service.deleteCustomer(customerId);
        expect(mockCustomerDeleteUseCase.deleteCustomer).toHaveBeenCalledWith(customerId);
    }));
    it('debería añadir crédito a un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerId = 1;
        const creditAmount = 1000;
        const expectedConfirmation = {
            success: true,
            responseCode: '200',
            message: 'Crédito añadido correctamente',
            customerId: customerId.toString(),
            customer: new CustomerData_1.CustomerData({
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                phoneNumber: '1234567890',
                address: '123 Main St',
                availableCredit: 2000, // después de añadir crédito
                created: new Date(),
                edited: new Date(),
            }),
        };
        mockCustomerCreditUseCase.addCredit.mockResolvedValue(expectedConfirmation);
        const result = yield service.addCredit(customerId, creditAmount);
        expect(mockCustomerCreditUseCase.addCredit).toHaveBeenCalledWith(customerId, creditAmount);
        expect(result).toEqual(expectedConfirmation);
    }));
    it('debería listar clientes ordenados por crédito correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCustomers = [
            new CustomerData_1.CustomerData({
                id: 2,
                name: 'Jane Doe',
                email: 'janedoe@example.com',
                phoneNumber: '0987654321',
                address: '456 Elm St',
                availableCredit: 2000,
                created: new Date(),
                edited: new Date(),
            }),
            new CustomerData_1.CustomerData({
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                phoneNumber: '1234567890',
                address: '123 Main St',
                availableCredit: 1000,
                created: new Date(),
                edited: new Date(),
            }),
        ];
        mockListCustomersByCreditUseCase.execute.mockResolvedValue(mockCustomers);
        const result = yield service.listCustomersOrderedByCredit();
        expect(mockListCustomersByCreditUseCase.execute).toHaveBeenCalled();
        expect(result).toEqual(mockCustomers);
    }));
});
