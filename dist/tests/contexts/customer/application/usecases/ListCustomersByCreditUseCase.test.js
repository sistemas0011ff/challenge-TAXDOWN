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
const ListCustomersByCreditUseCase_1 = require("../../../../../contexts/customer/application/usecases/ListCustomersByCreditUseCase");
const ListCustomersByCreditQuery_1 = require("../../../../../contexts/customer/application/queries/ListCustomersByCreditQuery");
describe('ListCustomersByCreditUseCase', () => {
    let listCustomersByCreditUseCase;
    let mockCustomerQueryHandler;
    beforeEach(() => {
        mockCustomerQueryHandler = {
            execute: jest.fn(),
        };
        listCustomersByCreditUseCase = new ListCustomersByCreditUseCase_1.ListCustomersByCreditUseCase(mockCustomerQueryHandler);
    });
    it('debería listar clientes ordenados por crédito correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCustomers = [
            {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                phoneNumber: '1234567890',
                address: '123 Main St',
                availableCredit: 1500,
                created: new Date(),
                edited: new Date(),
            },
            {
                id: 2,
                name: 'Jane Doe',
                email: 'janedoe@example.com',
                phoneNumber: '0987654321',
                address: '456 Elm St',
                availableCredit: 2000,
                created: new Date(),
                edited: new Date(),
            },
        ];
        mockCustomerQueryHandler.execute.mockResolvedValue(mockCustomers);
        const result = yield listCustomersByCreditUseCase.execute();
        expect(mockCustomerQueryHandler.execute).toHaveBeenCalledWith(new ListCustomersByCreditQuery_1.ListCustomersByCreditQuery());
        expect(result).toEqual(mockCustomers);
    }));
    it('debería lanzar un error si la consulta falla', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCustomerQueryHandler.execute.mockRejectedValue(new Error('Error al consultar los clientes'));
        yield expect(listCustomersByCreditUseCase.execute()).rejects.toThrow('Error al consultar los clientes');
        expect(mockCustomerQueryHandler.execute).toHaveBeenCalledWith(new ListCustomersByCreditQuery_1.ListCustomersByCreditQuery());
    }));
});
