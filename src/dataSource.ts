import { DataSource } from "typeorm";
import { Item } from "./modules/items/database/Item";
import { config } from "./config";


/*
The current implementation using a real database connection works for this technical interview since we need to 
demonstrate the integration. However, in a production environment, proper repository mocking would be the professional 
approach for testing.

something like: 
class MockItemRepository implements IitemRepository {
    private items: Item[] = [];
    
    async getAll(): Promise<Item[]> {
        return this.items;
    }
    
    async create(item: Item): Promise<Item> {
        const newItem = { ...item, id: this.items.length + 1 };
        this.items.push(newItem);
        return newItem;
    }
}

*/
let testDataSource = new DataSource({
    type: "postgres", // or your preferred database
    host: config.database.host,
    port: parseInt(config.database.port || "5432"),
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true, // set to false in production
    logging: false,
    entities: [Item],
    migrations: [],
    subscribers: [],
    dropSchema: true // esto es para que se borre la base de datos y se cree de nuevo cada vez que se ejecuta el test
})

let dataSource = new DataSource({
    type: "postgres", // or your preferred database
    host: config.database.host,
    port: parseInt(config.database.port || "5432"),
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true, // set to false in production
    logging: false,
    entities: [Item],
    migrations: [],
    subscribers: [],
})

export const AppDataSource = config.environment  === 'test' ? testDataSource : dataSource