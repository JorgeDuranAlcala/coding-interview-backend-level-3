import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('item')
export class Item {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;    
}
