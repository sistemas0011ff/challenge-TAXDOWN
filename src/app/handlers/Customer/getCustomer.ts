import { APIGatewayProxyHandler } from "aws-lambda";
import { ICustomerRegistryService } from "../../../contexts/customer/application/interfaces/ICustomerRegistryService";
import Container, { ICustomerRegistryServiceToken } from "../../di/iocContainer";

export const handler: APIGatewayProxyHandler = async () => {
    try {
        const customerRegistryService = Container.get<ICustomerRegistryService>(ICustomerRegistryServiceToken);
        const customers = await customerRegistryService.listCustomers();

        return {
            statusCode: 200,
            body: JSON.stringify(customers),
        };
    } catch (error) { 
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al obtener los clientes.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};
