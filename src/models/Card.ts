import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lane } from './Lane';

@Entity("cards")
export class Card {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    lane_id: string;

    @ManyToOne(() => Lane, lane => lane.cards, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "lane_id" })
    lane: Lane;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}