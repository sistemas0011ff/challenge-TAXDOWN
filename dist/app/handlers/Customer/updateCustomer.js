"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.handler = void 0;
const CustomerData_1 = require("../../../contexts/customer/application/dtos/CustomerData");
const iocContainer_1 = __importStar(require("../../di/iocContainer"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'No se proporcionaron datos.' })
            };
        }
        const data = JSON.parse(event.body);
        const customerData = new CustomerData_1.CustomerData(data);
        const customerRegistryService = iocContainer_1.default.get(iocContainer_1.ICustomerRegistryServiceToken);
        const updatedCustomer = yield customerRegistryService.updateCustomer(customerData);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Cliente actualizado con éxito",
                customer: updatedCustomer
            }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al actualizar el cliente.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
});
exports.handler = handler;
