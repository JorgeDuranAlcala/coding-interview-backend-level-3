import Hapi from '@hapi/hapi'
import { defineRoutes } from './routes'
import { AppDataSource } from './dataSource'

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
    })

    defineRoutes(server)

    server.ext('onPreResponse', (request, h) => {
        const response = request.response as any;
        if (response.isBoom) {
            return h.response({
                errors: [{
                    message: response.message
                }]
            }).code(response.output.statusCode);
        }
        return h.continue;
    });
    
    return server
}

export const initializeServer = async () => {
    if (!AppDataSource?.isInitialized) {
        await AppDataSource.initialize()
    }
    const server = getServer()
    await server.initialize()
    return server
}

export const startServer = async () => {
    if (!AppDataSource?.isInitialized) {
        await AppDataSource.initialize()
    }
    const server = getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
};