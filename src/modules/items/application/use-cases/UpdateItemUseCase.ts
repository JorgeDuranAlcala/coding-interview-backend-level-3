import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import { ItemModel } from "../../domain/entities/item.model";
import { CreateItem } from "../../domain/types/create-item";

export class UpdateItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    public async execute(id: number, item: Partial<CreateItem>): Promise<ItemModel | null> {
        try {
            return await this.itemRepository.update(item, id);            
        } catch (error) {
            return null;
        }
    }
}
