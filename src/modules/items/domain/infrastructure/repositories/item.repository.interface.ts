import { ItemModel } from "../../entities/item.model";
import { CreateItem } from "../../types/create-item";

export interface IitemRepository {
    getAll(): Promise<ItemModel[]>;
    get(id: number): Promise<ItemModel>;
    create(item: CreateItem): Promise<ItemModel>;
    delete(id: number): Promise<ItemModel>;
    update(itemData: Partial<CreateItem>, id: number): Promise<ItemModel>;
}