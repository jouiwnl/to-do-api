import { getRepository } from "typeorm";
import { Card } from "../models/Card";

type CardRequestCreate = {
    name: string,
    description: string,
    link: string,
    lane_id: string;
    dtevento: string;
}

type CardRequestWithId = {
    id: string;
}

type CardUpdateRequest = {
    id: string,
    name: string,
    description: string,
    link: string,
    status: string,
    lane_id: string;
    dtevento: string;
}

const ERROR_MESSAGE = "Esse card não existe";

export class CardService {

    async executeRegister({ name, description, link, lane_id, dtevento } : CardRequestCreate) : Promise<Card> {
        const cardRepository = getRepository(Card);
        const card = await cardRepository.create({ name, description, link, lane_id })
        await cardRepository.save(card);

        return card;
    }

    async executeFindAll(): Promise<Card[]> {
        const cardRepository = getRepository(Card);
        const cards = await cardRepository.find({ relations: ['lane'] });

        return cards;
    }

    async executeFindById({ id } : CardRequestWithId): Promise<Card | Error> {
        const cardRepository = getRepository(Card);
        const card = await cardRepository.findOne({ id: id });

        if (!card) {
            return new Error(ERROR_MESSAGE)
        }

        return card;
    }

    async executeDelete({ id } : CardRequestWithId): Promise<Error | void> {
        const cardRepository = getRepository(Card);
        const cardForDelete = await cardRepository.findOne({ id: id });

        if (!cardForDelete){
            return new Error(ERROR_MESSAGE);
        } 

        await cardRepository.delete(id);
    }

    async executeUpdate({id, name, description, status, link, lane_id, dtevento} : CardUpdateRequest): Promise<Error | Card> {
        const cardRepository = getRepository(Card);
        const cardForUpdate = await cardRepository.findOne({ id: id });
        
        if (!cardForUpdate) {
            return new Error(ERROR_MESSAGE);
        }

        cardForUpdate.name = name ? name : cardForUpdate.name;
        cardForUpdate.description = description ? description : cardForUpdate.description;
        cardForUpdate.lane_id = lane_id ? lane_id : cardForUpdate.lane_id;
        cardForUpdate.link = link ? link : cardForUpdate.link;
        cardForUpdate.status = status ? status : cardForUpdate.status;
        cardForUpdate.dtevento = dtevento ? dtevento : cardForUpdate.dtevento;

        await cardRepository.save(cardForUpdate);

        return cardForUpdate;
    }
}