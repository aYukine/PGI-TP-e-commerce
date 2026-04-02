import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    receiptId: string;

    @Column({type: "timestamp"})
    issuedAt: Date;

    @Column()
    name: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price: number;
}