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
const CustomerDeleteUseCase_1 = require("../../../../../contexts/customer/application/usecases/CustomerDeleteUseCase");
const DeleteCustomerCommand_1 = require("../../../../../contexts/customer/application/commands/DeleteCustomerCommand");
describe('CustomerDeleteUseCase', () => {
    let customerDeleteUseCase;
    let mockCommandHandler;
    beforeEach(() => {
        mockCommandHandler = {
            handle: jest.fn(),
        };
        customerDeleteUseCase = new CustomerDeleteUseCase_1.CustomerDeleteUseCase(mockCommandHandler);
    });
    it('debería eliminar un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerId = 1;
        const customerConfirmation = {
            success: true,
            responseCode: '200',
            message: 'Cliente eliminado correctamente',
        };
        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: customerConfirmation,
        });
        yield customerDeleteUseCase.deleteCustomer(customerId);
        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new DeleteCustomerCommand_1.DeleteCustomerCommand(customerId));
    }));
    it('debería lanzar un error si la eliminación del cliente falla', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerId = 1;
        mockCommandHandler.handle.mockResolvedValue({
            result: false,
            value: {
                success: false,
                responseCode: '500',
                message: 'Error al eliminar el cliente',
            },
        });
        yield expect(customerDeleteUseCase.deleteCustomer(customerId)).rejects.toThrow("Error al eliminar el cliente");
        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new DeleteCustomerCommand_1.DeleteCustomerCommand(customerId));
    }));
});
