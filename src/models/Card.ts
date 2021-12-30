import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lane } from './Lane';
import { Status } from './Status';

@Entity("cards")
export class Card {

    @PrimaryColumn()
    id: string;

    @Column()
    status: string;

    @Column()
    name: string;

    @Column()
    link: string;

    @Column()
    description: string;

    @Column()
    lane_id: string;

    @ManyToOne(() => Lane, lane => lane.cards, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "lane_id" })
    lane: Lane;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}