import { ItemRepository } from "../../infrastructure/repositories/item.repository";
import { ItemModel } from "../../domain/entities/item.model";

export class GetItemByIdUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    public async execute(id: number): Promise<ItemModel | null> {
        try {
            return await this.itemRepository.get(id);            
        } catch (error) {
            return null;
        }
    }
}
