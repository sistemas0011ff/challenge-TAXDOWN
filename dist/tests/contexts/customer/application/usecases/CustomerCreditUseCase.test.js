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
const CustomerCreditUseCase_1 = require("../../../../../contexts/customer/application/usecases/CustomerCreditUseCase");
const AddCreditCommand_1 = require("../../../../../contexts/customer/application/commands/AddCreditCommand");
describe('CustomerCreditUseCase', () => {
    let customerCreditUseCase;
    let mockCommandHandler;
    beforeEach(() => {
        mockCommandHandler = {
            handle: jest.fn(),
        };
        customerCreditUseCase = new CustomerCreditUseCase_1.CustomerCreditUseCase(mockCommandHandler);
    });
    it('debería añadir crédito correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerId = 1;
        const creditAmount = 1000;
        const customerConfirmation = {
            success: true,
            responseCode: '200',
            message: 'Crédito añadido correctamente',
            customerId: '1',
        };
        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: customerConfirmation,
        });
        const result = yield customerCreditUseCase.addCredit(customerId, creditAmount);
        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new AddCreditCommand_1.AddCreditCommand(customerId, creditAmount));
        expect(result).toEqual(customerConfirmation);
    }));
    it('debería lanzar un error si el monto de crédito es menor o igual a 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerId = 1;
        const creditAmount = 0;
        yield expect(customerCreditUseCase.addCredit(customerId, creditAmount)).rejects.toThrow("El monto de crédito debe ser mayor a 0");
        expect(mockCommandHandler.handle).not.toHaveBeenCalled();
    }));
    it('debería lanzar un error si el comando falla', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerId = 1;
        const creditAmount = 1000;
        mockCommandHandler.handle.mockResolvedValue({
            result: false,
            value: {
                success: false,
                responseCode: '500',
                message: 'Error al añadir crédito al cliente',
            },
        });
        yield expect(customerCreditUseCase.addCredit(customerId, creditAmount)).rejects.toThrow("Error al añadir crédito al cliente");
        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new AddCreditCommand_1.AddCreditCommand(customerId, creditAmount));
    }));
});
