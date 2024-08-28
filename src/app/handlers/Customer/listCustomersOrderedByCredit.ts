import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { ICustomerRegistryService } from '../../../contexts/customer/application/interfaces/ICustomerRegistryService';
import Container, { ICustomerRegistryServiceToken } from '../../di/iocContainer';

export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
    try {
        const customerRegistryService = Container.get<ICustomerRegistryService>(ICustomerRegistryServiceToken);
        const customers = await customerRegistryService.listCustomersOrderedByCredit();

        return {
            statusCode: 200,
            body: JSON.stringify(customers),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al listar los clientes.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};
