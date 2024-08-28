import { APIGatewayProxyHandler } from "aws-lambda";
import { ICustomerRegistryService } from "../../../contexts/customer/application/interfaces/ICustomerRegistryService";
import Container, { ICustomerRegistryServiceToken } from "../../di/iocContainer";

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const customerId = event.pathParameters?.id;
        if (!customerId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'ID de cliente no proporcionado.' }),
            };
        }

        const customerRegistryService = Container.get<ICustomerRegistryService>(ICustomerRegistryServiceToken);
        const customer = await customerRegistryService.getCustomerById(Number(customerId));

        if (!customer) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Cliente no encontrado.' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(customer),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al obtener el cliente.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};
