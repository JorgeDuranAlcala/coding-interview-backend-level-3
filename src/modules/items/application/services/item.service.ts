import { IitemService } from "../../domain/application/services/item.service.interface";
import { ItemModel } from "../../domain/entities/item.model";
import { CreateItemUseCase } from "../use-cases/CreateItemUseCase";
import { DeleteItemUseCase } from "../use-cases/DeleteItemUseCase";
import { GetAllItemsUseCase } from "../use-cases/GetAllItemsUseCase";
import { GetItemByIdUseCase } from "../use-cases/GetItemByIdUseCase";
import { UpdateItemUseCase } from "../use-cases/UpdateItemUseCase";
import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import { CreateItemDto } from "../../domain/application/dtos/create-item.dto";
import { CreateItem } from "../../domain/types/create-item";

export class ItemService implements IitemService {
    private readonly createItemUseCase: CreateItemUseCase;
    private readonly getAllItemsUseCase: GetAllItemsUseCase;
    private readonly getItemByIdUseCase: GetItemByIdUseCase;
    private readonly updateItemUseCase: UpdateItemUseCase;
    private readonly deleteItemUseCase: DeleteItemUseCase;

    constructor(private readonly itemRepository: ItemRepository) {
        this.createItemUseCase = new CreateItemUseCase(itemRepository);
        this.getAllItemsUseCase = new GetAllItemsUseCase(itemRepository);
        this.getItemByIdUseCase = new GetItemByIdUseCase(itemRepository);
        this.updateItemUseCase = new UpdateItemUseCase(itemRepository);
        this.deleteItemUseCase = new DeleteItemUseCase(itemRepository);
    }

    async getAll(): Promise<ItemModel[]> {
        return await this.getAllItemsUseCase.execute();
    }

    async getById(id: number): Promise<ItemModel | null> {
        return await this.getItemByIdUseCase.execute(id);
    }

    async create(item: CreateItemDto): Promise<ItemModel> {
        return await this.createItemUseCase.execute(item);
    }

    async update(id: number, item: Partial<CreateItem>): Promise<ItemModel | null> {
        return await this.updateItemUseCase.execute(id, item);
    }

    async delete(id: number): Promise<ItemModel | null> {
        return await this.deleteItemUseCase.execute(id);
    }
}
