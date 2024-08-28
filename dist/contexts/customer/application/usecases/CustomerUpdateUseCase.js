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
exports.CustomerUpdateUseCase = exports.ICustomerUpdateUseCaseToken = void 0;
const typedi_1 = require("typedi");
const UpdateCustomerCommand_1 = require("../commands/UpdateCustomerCommand");
exports.ICustomerUpdateUseCaseToken = new typedi_1.Token();
let CustomerUpdateUseCase = class CustomerUpdateUseCase {
    constructor(commandHandler) {
        this.commandHandler = commandHandler;
    }
    updateCustomer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new UpdateCustomerCommand_1.UpdateCustomerCommand(data);
            const commandResult = yield this.commandHandler.handle(command);
            if (!commandResult.result || !commandResult.value.customer) {
                throw new Error("Error al actualizar el cliente");
            }
            return commandResult.value.customer;
        });
    }
};
exports.CustomerUpdateUseCase = CustomerUpdateUseCase;
exports.CustomerUpdateUseCase = CustomerUpdateUseCase = __decorate([
    (0, typedi_1.Service)(exports.ICustomerUpdateUseCaseToken),
    __metadata("design:paramtypes", [Object])
], CustomerUpdateUseCase);
