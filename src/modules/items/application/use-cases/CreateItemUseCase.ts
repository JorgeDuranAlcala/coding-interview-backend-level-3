import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import { ItemModel } from "../../domain/entities/item.model";
import { CreateItem } from "../../domain/types/create-item";

export class CreateItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    public async execute(item: CreateItem): Promise<ItemModel> {
        return await this.itemRepository.create(item);
    }
}
