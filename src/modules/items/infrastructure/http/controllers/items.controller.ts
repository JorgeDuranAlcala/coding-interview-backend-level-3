import { ReqRefDefaults, Request, ResponseToolkit } from "@hapi/hapi";
import { IitemService } from "../../../domain/application/services/item.service.interface";
import { CreateItemDtoHttp } from "../dtos/item.dto";
import { UpdateDtoHttp } from "../dtos/update-item.dto";

export class ItemsController {

    constructor(
        private readonly itemService: IitemService
    ) {}

    async getAll() {
        const items = await this.itemService.getAll();
        return items.map(item => item.toJson())
    }

    async create(request: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) {
        const { name, price } = request.payload as CreateItemDtoHttp

        if (!price) {
            return h.response({
                errors: [{
                    field: 'price',
                    message: 'Field "price" is required'
                }]
            }).code(400)
        }

        if (price < 0) {
            return h.response({
                errors: [{
                    field: 'price',
                    message: 'Field "price" cannot be negative'
                }]
            }).code(400)
        }

        const newItem = (await this.itemService.create({ name, price })).toJson()
        return h.response(newItem).code(201)
    }

    async update(request: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) {
        const { name, price } = request.payload as UpdateDtoHttp
            
        if (price && price < 0) {
            return h.response({
                errors: [{
                    field: 'price',
                    message: 'Field "price" cannot be negative'
                }]
            }).code(400)
        }

        const item = await this.itemService.update(request.params.id, { name, price })
        if (!item) {
            return h.response().code(404)
        }
        return item.toJson();
    }

    async getById(request: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) {
        const item = await this.itemService.getById(request.params.id)
        if (!item) {
            return h.response().code(404)
        }
        return item.toJson();
    }

    async delete(request: Request<ReqRefDefaults>, h: ResponseToolkit<ReqRefDefaults>) {
        const item = await this.itemService.delete(request.params.id)
        if (!item) {
            return h.response().code(404)
        }
        return h.response(item).code(204)
    }
}