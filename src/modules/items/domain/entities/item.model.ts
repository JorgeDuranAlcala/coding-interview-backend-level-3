import { Item } from "../../database/Item";
import { ItemJson } from "../types/item.json";

export class ItemModel {
    private _id: number = 0;
    private _name: string = '';
    private _price: number = 0;

    public toJson(): ItemJson {
        return {
            id: this._id,
            name: this._name,
            price: Number(this._price)
        }
    }

    static hydrate(root: Item): ItemModel {
        const item = new ItemModel();
        item._id = root.id;
        item._name = root.name;
        item._price = root.price;
        return item;
    }
}