import { Server } from "@hapi/hapi"
import { ItemRepository } from "./modules/items/infrastructure/repositories/item.repository"
import { ItemService } from "./modules/items/application/services/item.service"
import { ItemsController } from "./modules/items/infrastructure/http/controllers/items.controller"

export const defineRoutes = (server: Server) => {

    const itemRepository = new ItemRepository();
    const itemService = new ItemService(itemRepository);
    const itemsController = new ItemsController(itemService)

    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return { ok: true }
        }
    })

    server.route({
        method: 'GET',
        path: '/items',
        handler: async (request, h) => await itemsController.getAll()
    })

    server.route({
        method: 'POST',
        path: '/items',
        handler: async (request, h) => {
            return await itemsController.create(request, h)
        }
    })

    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: async (request, h) => {
            return await itemsController.getById(request, h);
        }
    })

    server.route({
        method: 'PUT',
        path: '/items/{id}',
        handler: async (request, h) => {
            return await itemsController.update(request, h);
        }
    })

    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: async (request, h) => {
            return await itemsController.delete(request, h);
        }
    })
}
