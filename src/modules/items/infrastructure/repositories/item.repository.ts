import { Repository } from "typeorm";
import { ItemModel } from "../../domain/entities/item.model";
import { IitemRepository } from "../../domain/infrastructure/repositories/item.repository.interface";
import { Item } from "../../database/Item";
import { AppDataSource } from "../../../../dataSource";
import { CreateItem } from "../../domain/types/create-item";

export class ItemRepository implements IitemRepository {

    private repository: Repository<Item>

    constructor() {
        this.repository = AppDataSource.getRepository(Item);
    }

    async getAll(): Promise<ItemModel[]> {
        const items = await this.repository.find();
        return items.map(item => ItemModel.hydrate(item));
    }

    async get(id: number): Promise<ItemModel> {
        const item = await this.repository.findOneBy({ id });
        if (!item) throw new Error('Item not found');
        return ItemModel.hydrate(item);
    }

    async create(item: CreateItem): Promise<ItemModel> {
        const newItem = this.repository.create({ name: item.name, price: item.price });
        const savedItem = await this.repository.save(newItem);
        return ItemModel.hydrate(savedItem);
    }

    async delete(id: number): Promise<ItemModel> {
        const item = await this.repository.findOneBy({ id });
        if (!item) throw new Error('Item not found');
        const deletedItem = await this.repository.remove(item);
        return ItemModel.hydrate(deletedItem);
    }

    async update(itemData: Partial<CreateItem>, id: number): Promise<ItemModel> {
        const item = await this.repository.findOneBy({ id });
        if (!item) throw new Error('Item not found');
        const updatedItem = await this.repository.save({ ...item, ...itemData });
        return ItemModel.hydrate(updatedItem);
    }
}