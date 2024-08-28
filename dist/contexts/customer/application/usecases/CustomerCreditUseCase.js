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
exports.CustomerCreditUseCase = exports.ICustomerCreditUseCaseToken = void 0;
const typedi_1 = require("typedi");
const AddCreditCommand_1 = require("../commands/AddCreditCommand");
exports.ICustomerCreditUseCaseToken = new typedi_1.Token();
let CustomerCreditUseCase = class CustomerCreditUseCase {
    constructor(commandHandler) {
        this.commandHandler = commandHandler;
    }
    addCredit(customerId, creditAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (creditAmount <= 0) {
                throw new Error("El monto de crédito debe ser mayor a 0");
            }
            const command = new AddCreditCommand_1.AddCreditCommand(customerId, creditAmount);
            const commandResult = yield this.commandHandler.handle(command);
            if (!commandResult.result || !commandResult.value.success) {
                throw new Error(commandResult.value.message || "Error al añadir crédito al cliente");
            }
            return commandResult.value;
        });
    }
};
exports.CustomerCreditUseCase = CustomerCreditUseCase;
exports.CustomerCreditUseCase = CustomerCreditUseCase = __decorate([
    (0, typedi_1.Service)(exports.ICustomerCreditUseCaseToken),
    __metadata("design:paramtypes", [Object])
], CustomerCreditUseCase);
