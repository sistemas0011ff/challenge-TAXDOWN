import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
    let baseUrl: string;

    const hostHeader = event.headers.Host || event.headers.host;

    if (hostHeader) {
        const isLocal = hostHeader.includes('localhost');
        baseUrl = isLocal ? `http://${hostHeader}/${event.requestContext.stage}` : `https://${hostHeader}/${event.requestContext.stage}`;
    } else {
        baseUrl = 'http://default-host';
    }

    const swaggerSpec = {
        openapi: '3.0.0',
        info: {
            title: 'Customer API',
            version: '1.0.0',
            description: 'API para manejar información de clientes en SWars.',
        },
        servers: [
            {
                url: baseUrl,
            },
        ],
        paths: {
            '/customer': {
                get: {
                    summary: 'Lista todos los clientes',
                    tags: ['customers'],
                    responses: {
                        '200': {
                            description: 'Lista de clientes obtenida con éxito',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Customer',
                                        },
                                    },
                                },
                            },
                        },
                        '500': {
                            description: 'Error interno del servidor',
                        },
                    },
                },
                post: {
                    summary: 'Crea un nuevo cliente',
                    tags: ['customers'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Customer',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Cliente creado con éxito',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Customer',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Datos de entrada no válidos',
                        },
                        '500': {
                            description: 'Error interno del servidor',
                        },
                    },
                },
            },
            '/customer/{id}': {
                get: {
                    summary: 'Obtiene la información de un cliente específico',
                    tags: ['customers'],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            description: 'ID del cliente a obtener',
                            schema: {
                                type: 'integer',
                                format: 'int64',
                            },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Información detallada del cliente',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Customer',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'ID del cliente no proporcionado o inválido',
                        },
                        '404': {
                            description: 'Cliente no encontrado',
                        },
                        '500': {
                            description: 'Error interno del servidor',
                        },
                    },
                },
                put: {
                    summary: 'Actualiza la información de un cliente existente',
                    tags: ['customers'],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            description: 'ID del cliente a actualizar',
                            schema: {
                                type: 'integer',
                                format: 'int64',
                            },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Customer',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Cliente actualizado con éxito',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Customer',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Datos de entrada no válidos',
                        },
                        '404': {
                            description: 'Cliente no encontrado',
                        },
                        '500': {
                            description: 'Error interno del servidor',
                        },
                    },
                },
                delete: {
                    summary: 'Elimina un cliente existente',
                    tags: ['customers'],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            description: 'ID del cliente a eliminar',
                            schema: {
                                type: 'integer',
                                format: 'int64',
                            },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Cliente eliminado con éxito',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'ID del cliente no proporcionado o inválido',
                        },
                        '404': {
                            description: 'Cliente no encontrado',
                        },
                        '500': {
                            description: 'Error interno del servidor',
                        },
                    },
                },
            },
            '/customer/credit': {
                post: {
                    summary: 'Añade crédito disponible a un cliente',
                    tags: ['customers'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        customerId: { type: 'integer', format: 'int64' },
                                        creditAmount: { type: 'number' },
                                    },
                                    required: ['customerId', 'creditAmount'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Crédito añadido con éxito',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Customer',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Datos de entrada no válidos',
                        },
                        '404': {
                            description: 'Cliente no encontrado',
                        },
                        '500': {
                            description: 'Error interno del servidor',
                        },
                    },
                },
            },
            '/customer/credit/list': {
                get: {
                    summary: 'Lista todos los clientes ordenados por crédito disponible',
                    tags: ['customers'],
                    responses: {
                        '200': {
                            description: 'Lista de clientes obtenida con éxito',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Customer',
                                        },
                                    },
                                },
                            },
                        },
                        '500': {
                            description: 'Error interno del servidor',
                        },
                    },
                },
            },
        },
        components: {
            schemas: {
                Customer: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        phoneNumber: { type: 'string' },
                        address: { type: 'string' },
                        availableCredit: { type: 'number' },
                        created: { type: 'string', format: 'date-time' },
                        edited: { type: 'string', format: 'date-time' },
                    },
                    required: ['name', 'email', 'phoneNumber', 'address', 'availableCredit'],
                },
            },
        },
    };

    const swaggerSpecJsonString = JSON.stringify(swaggerSpec);
    const swaggerUiHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Swagger UI</title>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.3.2/swagger-ui.css">
        <style>body { margin: 0; padding: 0; }</style>
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.3.2/swagger-ui-bundle.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.3.2/swagger-ui-standalone-preset.js"></script>
        <script>
            window.onload = () => {
                window.ui = SwaggerUIBundle({
                    spec: ${swaggerSpecJsonString},
                    dom_id: '#swagger-ui',
                    deepLinking: true,
                    presets: [
                        SwaggerUIBundle.presets.apis,
                        SwaggerUIStandalonePreset
                    ],
                    layout: "StandaloneLayout"
                });
            };
        </script>
    </body>
    </html>
    `;

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: swaggerUiHtml,
    };
};