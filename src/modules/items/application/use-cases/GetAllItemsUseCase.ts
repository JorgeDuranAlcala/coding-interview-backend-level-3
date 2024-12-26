import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import { ItemModel } from "../../domain/entities/item.model";

export class GetAllItemsUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    public async execute(): Promise<ItemModel[]> {
        return await this.itemRepository.getAll();
    }
}
