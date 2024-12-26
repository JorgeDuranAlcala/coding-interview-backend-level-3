import { ItemModel } from "../../domain/entities/item.model";
import { ItemRepository } from "../../infrastructure/repositories/item.repository";

export class DeleteItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    public async execute(id: number): Promise<ItemModel | null> {
        try {
            return await this.itemRepository.delete(id);
        } catch (error) {
            return null            
        }
    }
}
