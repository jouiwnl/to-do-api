import { getRepository } from "typeorm";
import { Lane } from "../models/Lane";

type LaneRequestCreate = {
    name: string;
}

type LaneRequestWithId = {
    id: string;
}

type LaneUpdateRequest = {
    id: string,
    name: string
}

const ERROR_MESSAGE = "Essa coluna não existe";

export class LaneService {

    async executeRegister({ name } : LaneRequestCreate) : Promise<Lane> {
        const laneRepository = getRepository(Lane);
        const lane = await laneRepository.create({ name })
        await laneRepository.save(lane);

        return lane;
    }

    async executeFindAll(): Promise<Lane[]> {
        const laneRepository = getRepository(Lane);
        const lanes = await laneRepository.find({ relations: ["cards"] });

        return lanes;
    }

    async executeFindById({ id } : LaneRequestWithId): Promise<Lane | Error> {
        const laneRepository = getRepository(Lane);
        const lane = await laneRepository.findOne(id, {relations: ["cards"]});

        if (!lane) {
            return new Error(ERROR_MESSAGE)
        }

        return lane;
    }

    async executeDelete({ id } : LaneRequestWithId): Promise<Error | void> {
        const laneRepository = getRepository(Lane);
        const laneForDelete = await laneRepository.findOne({ id: id });

        if (!laneForDelete){
            return new Error(ERROR_MESSAGE);
        } 

        await laneRepository.delete(id);
    }

    async executeUpdate({id, name} : LaneUpdateRequest): Promise<Error | Lane> {
        const laneRepository = getRepository(Lane);
        const laneForUpdate = await laneRepository.findOne({ id: id });

        if (!laneForUpdate) {
            return new Error(ERROR_MESSAGE);
        }

        laneForUpdate.name = name ? name : laneForUpdate.name;

        await laneRepository.save(laneForUpdate);

        return laneForUpdate;
    }
}