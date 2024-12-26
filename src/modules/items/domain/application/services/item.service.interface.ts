import { ItemModel } from "../../entities/item.model";
import { CreateItemDto } from "../dtos/create-item.dto";


export interface IitemService {
    getAll(): Promise<ItemModel[]>;
    getById(id: number): Promise<ItemModel | null>;
    create(item: CreateItemDto): Promise<ItemModel>;
    update(id: number, item: Partial<CreateItemDto>): Promise<ItemModel | null>;
    delete(id: number): Promise<ItemModel | null>;
}