import { Entity, Column, CreateDateColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Card } from './Card';

@Entity("lanes")
export class Lane {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Card, () => Lane)
    cards: Card[];
    
    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}